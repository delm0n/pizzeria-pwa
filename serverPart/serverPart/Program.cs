using Nancy.Hosting.Self;
using System;
using WebSocketSharp.Server;
using serverPart.Data.Helper;

namespace serverPart
{

    internal class Program
    {
        static void Main ( string[] args )
        {
            var uri = new Uri("http://localhost:1234");

            HostConfiguration hostConfiguration = new HostConfiguration();
            hostConfiguration.UrlReservations.CreateAutomatically = true;

            WebSocketServer wss = new WebSocketServer("ws://127.0.0.1:7890");
            wss.AddWebSocketService<OrderStatus> ( "/OrderStatusWebsocket" );

            using ( var host = new NancyHost ( hostConfiguration, uri ) )
            {
                host.Start ( ); wss.Start ( );

                Console.WriteLine ( "Your application is running on " + uri + " and ws://127.0.0.1:7890" );
                Console.WriteLine ( "Press any [Enter] to close the host." );
                Console.ReadLine ( );
                host.Stop ( ); wss.Stop ( );
            }
        }
    }
}
