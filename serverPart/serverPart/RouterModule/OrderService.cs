using Nancy;
using Nancy.ModelBinding;
using NPOI.HPSF;
using NPOI.XWPF.UserModel;
using Org.BouncyCastle.Asn1.X509;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
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
                    order.ClientId = x.ClientId;
                    order.TypeOfPay = x.TypeOfPay;
                    order.OrderId = x.OrderId;
                    order.OrderDate = DateTime.Now.ToString ( "dd.MM.yyyy HH:mm" );
                    order.LastPrice = x.LastPrice;
                    order.ConstructorPizzasJson = x.ConstructorPizzasJson;
                    order.PizzasJson = x.PizzasJson;
                    order.DishesJson = x.DishesJson;
                    order.Promocode = x.Promocode; //вызвать client +promocode
                    order.Status = "Принят";

                    dbContext.Orders.Add ( order );
                    dbContext.SaveChanges ( );
                }

                return JsonSerializer.Serialize ( order.OrderId);
            };

            Get["/history-order", runAsync: true] = async ( x, token ) =>
            {
                List<Order> orders = new List<Order> ();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    orders = await dbContext.Orders.ToListAsync ( );
                    orders.ForEach ( o =>
                    {
                        if ( DateTime.ParseExact ( o.OrderDate, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture ) < DateTime.Now.AddMinutes ( -2 ) )
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
