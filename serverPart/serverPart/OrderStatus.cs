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
            var message = JsonSerializer.Deserialize<GetMessage>(e.Data);
            int orderId = -1;
            SendMessage sendMessage = new SendMessage ();

            if ( message.Action == "cancel" && int.TryParse ( message.Num, out orderId ) )
            {
                using ( var dbContext = new ApplicationContext ( ) )
                {
                    Order order = await dbContext.Orders.FirstOrDefaultAsync(o => o.OrderId == orderId);

                    if ( order != null && order.Status == "Принят" )
                    {
                        order.Status = "Отменён";
                        sendMessage.Message = "Отменён";
                        sendMessage.Num = orderId;

                        if ( order.ClientId != null )
                        {
                            Client client = await dbContext.Clients.Where(c => c.ClientId == order.ClientId).FirstOrDefaultAsync();

                            if ( client != null )
                            {
                                sendMessage.Bonus = client.Bonus;
                            }
                        }

                        dbContext.SaveChanges ( );
                        Send ( JsonSerializer.Serialize ( sendMessage ) );
                    }
                }
            }

            if ( message.Action == "accept" && int.TryParse ( message.Num, out orderId ) )
            {
                using ( var dbContext = new ApplicationContext ( ) )
                {
                    Order order = await dbContext.Orders.Where(c => c.OrderId == orderId).FirstOrDefaultAsync();

                    if ( order != null )
                    {
                        order.Status = "Готовится";
                        await dbContext.SaveChangesAsync ( );

                        // Запускаем отложенную задачу на 1 минуту
                        await Task.Run ( async ( ) =>
                        {
                            await Task.Delay ( TimeSpan.FromMinutes ( 1 ) );

                            order.Status = "Доставлен";
                            sendMessage.Message = "Доставлен";
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

                            dbContext.SaveChanges ( );
                            Send ( JsonSerializer.Serialize ( sendMessage ) );

                        } );

                    }
                }
            }
        }
    }
}
