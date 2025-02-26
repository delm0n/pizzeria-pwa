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
                Client client = new Client();
                int clientId = x.ClientId;

                using ( var dbContext = new ApplicationContext ( ) )
                {
                   
                    order.ClientId = x.ClientId; // 0 у клиентов без регистрации

                    order.OrderName = x.OrderName; 
                    order.OrderTelephone = x.OrderTelephone;
                    order.Time = x.Time; // заказ ко времени

                    order.TypeOfPay = x.TypeOfPay;
                    order.OrderId = x.OrderId;
                    order.OrderDate = DateTime.Now.ToString ( "dd.MM.yyyy HH:mm" );

                    order.LastPrice = x.LastPrice;

                    order.ConstructorPizzasJson = x.ConstructorPizzasJson;
                    order.DishesJson = x.DishesJson;
                    order.PizzasJson = x.PizzasJson;

                    if ( x.ClientId != 0 && !string.IsNullOrEmpty ( x.Promocode )  )
                    {
                        client = await dbContext.Clients.FirstOrDefaultAsync ( c => c.ClientId == clientId );

                        // промокод
                        if ( string.IsNullOrEmpty ( client.PromocodeJson ) )
                        {
                            List<string> array = new List<string> ();
                            array.Add ( x.Promocode );
                            client.PromocodeJson = JsonSerializer.Serialize ( array );
                        }
                        else
                        {
                            List<string> array = JsonSerializer.Deserialize<List<String>>(client.PromocodeJson);
                            array.Add ( x.Promocode );
                            client.PromocodeJson = JsonSerializer.Serialize ( array );
                        }
                        order.Promocode = x.Promocode;

                        // пицца
                        List<PizzaCart> pizzaCart = JsonSerializer.Deserialize<List<PizzaCart>>(x.PizzasJson);
                        List<int> pizzaCartId = JsonSerializer.Deserialize<List<int>>(client.PizzaOrderJson);
                        foreach ( var pizza in pizzaCart )
                        {
                            if ( !pizzaCartId.Contains ( pizza.PizzaId ) )
                            {
                                pizzaCartId.Insert (0, pizza.PizzaId );
                            }
                        }
                        client.PizzaOrderJson = JsonSerializer.Serialize ( pizzaCartId.Count > 4 ? pizzaCartId.GetRange ( 0, 4 ) : pizzaCartId );
                    }

                    order.Comment = x.Comment;
                    order.Status = "Принят";
                    order.Address = x.Address;
                    order.Pickup = x.Pickup;

                    dbContext.Orders.Add ( order );
                    dbContext.SaveChanges ( );
                }

                return JsonSerializer.Serialize ( order.OrderId );
            };

            Get["/history-order/{id}", runAsync: true] = async ( x, token ) =>
            {
                List<Order> orders = new List<Order> ();
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
                }

                return JsonSerializer.Serialize ( orders );
            };


        }
    }
}
