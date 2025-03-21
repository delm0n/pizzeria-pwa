using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketSharp;
using WebSocketSharp.Server;
using System.Text.Json;

namespace serverPart.Data.Helper
{
    public class OrderStatus : WebSocketBehavior
    {

        protected override void OnClose ( CloseEventArgs e )
        {
        }

        protected override void OnOpen ( )
        {
        }

        protected override async void OnMessage ( MessageEventArgs e )
        {
            if ( int.TryParse ( e.Data, out int orderId ) )
            {   
                SendMessage sendMessage = new SendMessage ();
                using ( var dbContext = new ApplicationContext ( ) )
                {
                    Order order = await dbContext.Orders.Where(c => c.OrderId == orderId).FirstOrDefaultAsync();

                    if ( order != null )
                    {
                        // Запускаем отложенную задачу на 2 минуты
                        await Task.Run ( async ( ) =>
                        {
                            await Task.Delay ( TimeSpan.FromMinutes ( 1 ) ); // Ждем 1 минуту
                            order.Status = "Доставлен";

                            sendMessage.Message = "доставлен";
                            sendMessage.Num = orderId;

                            if ( order.ClientId != null )
                            {
                                Client client = await dbContext.Clients.Where(c => c.ClientId == order.ClientId).FirstOrDefaultAsync();
                                if ( client != null )
                                {
                                    client.Bonus = client.Bonus + order.Bonus;
                                    client.CanPlay = true;

                                    sendMessage.Bonus = client.Bonus;
                                    sendMessage.CanPlay = client.CanPlay;

                                }
                            }

                            await dbContext.SaveChangesAsync ( );
                            Send ( JsonSerializer.Serialize ( sendMessage) );
                        } );
                    }
                }
            }
        }
    }
}
