using Nancy;
using Nancy.ModelBinding;
using NPOI.HPSF;
using NPOI.XWPF.UserModel;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using serverPart.Data;
using serverPart.Data.Entity;
using serverPart.Data.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static NPOI.HSSF.Util.HSSFColor;

namespace serverPart.RouterModule
{
    public class OrderService : NancyModule
    {
        public OrderService ( )
        {

            Post["/send-order", runAsync: true] = async ( x, token ) =>
            {
                x = this.Bind<Order> ( );
                Order order = new Order ();
                
                using ( var dbContext = new ApplicationContext ( ) )
                {
                    order.OrderName = x.OrderName;
                    order.OrderTelephone = x.OrderTelephone;
                    order.Time = x.Time; // заказ ко времени

                    order.TypeOfPay = x.TypeOfPay;
                    order.OrderDate = DateTime.Now.ToString ( "dd.MM.yyyy HH:mm" );

                    order.LastPrice = x.LastPrice;

                    order.ConstructorPizzasJson = x.ConstructorPizzasJson;
                    order.DishesJson = x.DishesJson;
                    order.PizzasJson = x.PizzasJson;

                    order.Address = x.Address;
                    order.Pickup = x.Pickup;

                    // клиент существует
                    if ( x.ClientId != null )
                    {
                        Client client = new Client();
                        int clientId = x.ClientId;
                        client = await dbContext.Clients.FirstAsync ( c => c.ClientId == clientId );
                        order.ClientId = clientId; 

                        if ( x.PromocodeId != null )
                        {
                            // промокод введён 
                            Promocode promocode = new Promocode();
                            int promocodeId = x.PromocodeId;
                            promocode = await dbContext.Promocodes.FirstAsync ( c => c.PromocodeId == promocodeId );

                            List<int> array = JsonSerializer.Deserialize<List<int>>(client.PromocodeJson);
                            array.Add ( promocode.PromocodeId );
                            client.PromocodeJson = JsonSerializer.Serialize ( array ); 

                            order.PromocodeId = promocodeId;                 
                        }

                        else
                        {   
                            order.Bonus = x.Bonus;
                            client.Bonus = client.Bonus + order.Bonus;
                        }

                        // пицца
                        List<PizzaCart> pizzaCart = JsonSerializer.Deserialize<List<PizzaCart>>(x.PizzasJson);
                        List<int> pizzaCartId = JsonSerializer.Deserialize<List<int>>(client.PizzaOrderJson);
                        foreach ( var pizza in pizzaCart )
                        {
                            if ( !pizzaCartId.Contains ( pizza.PizzaId ) )
                            {
                                pizzaCartId.Insert ( 0, pizza.PizzaId );
                            }
                        }
                        // храним в истории последних заказов 4 пиццы
                        client.PizzaOrderJson = JsonSerializer.Serialize ( pizzaCartId.Count > 4 ? pizzaCartId.GetRange ( 0, 4 ) : pizzaCartId );
                    }
                    
                    order.Comment = x.Comment;
                    order.Status = "Принят";

                    dbContext.Orders.Add ( order );
                    dbContext.SaveChanges ( );
                }

                return JsonSerializer.Serialize ( order.OrderId );
            };

            Get["/history-order/{id}", runAsync: true] = async ( x, token ) =>
            {
                List<Order> orders = new List<Order> ();
                Client client = new Client();
                int id = x.id; // клиента

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    orders = await dbContext.Orders.Where ( c => c.ClientId == id ).ToListAsync ( );
                    orders.ForEach ( o =>
                    {
                        if ( o.Status == "Принят" && DateTime.ParseExact ( o.OrderDate, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture ) < DateTime.Now.AddMinutes ( -2 ) )
                        {
                            o.Status = "Доставлен";
                        }
                    } );

                    // возможность сыграть в игру
                    client = await dbContext.Clients.FirstOrDefaultAsync ( c => c.ClientId == id );
                    client.CanPlay = true;
                }

                return JsonSerializer.Serialize ( orders );
            };


        }
    }
}
