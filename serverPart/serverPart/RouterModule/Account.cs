using Nancy;
using Nancy.ModelBinding;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Data.Entity;
using System.Linq;
using JsonSerializer = System.Text.Json.JsonSerializer;


namespace serverPart.RouterModule
{
    public class Account : NancyModule
    {
        public Account ( )
        {

            Post["/enter", runAsync: true] = async ( x, token ) =>
            {
                x = this.Bind<Client> ( ); //Получаю параметры + null в модели
                Client client = new Client();
                string tel = x.Telephone; 
                string passw = x.Password;

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    client = await dbContext.Clients.FirstOrDefaultAsync ( c => c.Telephone == tel );
                }

                if ( client == null ) //если клиент не зарегистрирован
                    return "0";
                else
                {
                    if ( !PasswordHasher.VerifyPassword(passw, client.Password ) ) //если пароль не подошёл
                        return "1";
                    
                    else
                        return JsonSerializer.Serialize ( client );
                }
            };


            Post["/registration", runAsync: true] = async ( x, token ) =>
            {
                x = this.Bind<Client> ( );
                Client client = new Client(); string tel = x.Telephone;

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    if ( await dbContext.Clients.Where ( c => c.Telephone == tel ).FirstOrDefaultAsync ( ) != null )
                        return "false";

                    else
                    {  //если клиент с таким номером телефона и почтой не зарегистрирован

                        client.Telephone = x.Telephone;
                        client.FirstName = x.FirstName;
                        client.Password = PasswordHasher.HashPassword ( x.Password );
                        client.Email = x.Email;
                        dbContext.Clients.Add ( client );

                        await dbContext.SaveChangesAsync ( );
                    }
                }

                return JsonSerializer.Serialize ( client );
            };

            Post["/rewrite-account", runAsync: true] = async ( x, token ) =>
            {
                x = this.Bind<Client> ( );
                Client client = new Client();
                string tel = x.Telephone;
                string passw = x.Password;

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    client = await dbContext.Clients.FirstOrDefaultAsync ( c => c.Telephone == tel );

                    if ( client == null ) //если клиент не зарегистрирован
                        return "0";

                    else
                    {
                        if ( !PasswordHasher.VerifyPassword ( passw, client.Password ) ) //если пароль не подошёл
                            return "1";

                        else
                        {
                            if ( x.Email != null && x.Email != "" )
                                client.Email = x.Email;

                            if ( x.FirstName != null && x.FirstName != "" )
                                client.FirstName = x.FirstName;
                        }

                        return JsonSerializer.Serialize ( client );
                    }
                }
            };

            Get["/promocode/{id}-{code}", runAsync: true] = async ( x, token ) =>
            {
                int id = x.id; // клиента
                string code = x.code; // промокод
                Client client = new Client();
                Promocode promocode = new Promocode();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    client = await dbContext.Clients.Where ( c => c.ClientId == id ).FirstOrDefaultAsync ( );
                    promocode = await dbContext.Promocodes.Where ( p => p.Value == code ).FirstOrDefaultAsync ( );

                    if (  client == null )
                    {
                        return JsonSerializer.Serialize ( new { errorMessage = "Войдите, чтобы использовать" } );
                    }
                    else
                    {
                        if ( promocode == null )
                        {
                            return JsonSerializer.Serialize ( new { errorMessage = "Такого промокода не существует" } );
                        }
                        else
                        {
                            if ( client.PromocodeJson != "[]" )
                            {
                                int[] items = JsonSerializer.Deserialize<int[]>( client.PromocodeJson );

                                if ( items.Contains ( promocode.PromocodeId ) )
                                {
                                    return JsonSerializer.Serialize ( new { errorMessage = "Вы уже использовали этот промокод" } );
                                }

                            }

                            return JsonSerializer.Serialize ( promocode );

                        }
                    }

                }
            };

            Get["/promocode-percent/{id}", runAsync: true] = async ( x, token ) =>
            {
                int id = x.id; // промокод
               
                using ( var dbContext = new ApplicationContext ( ) )
                {
                        Promocode promocode = await dbContext.Promocodes.Where ( p => p.PromocodeId == id ).FirstOrDefaultAsync ( );
                        if ( promocode == null )
                        {
                            return JsonSerializer.Serialize ( new { errorMessage = "Такого промокода не существует" } );
                        }
                        else
                        {
                            return JsonSerializer.Serialize ( promocode );
                        }
                }
            };

            /////////////////

            //Get["/send-report-to-email/{id_client}&&{id_order}", runAsync: true] = async ( x, token ) =>
            //{
            //    string token_headers = Request.Headers["Authorization"].FirstOrDefault();

            //    if ( token_headers == PersonalToken.getToken ( ) )
            //    {

            //        int clientId = x.id_client;
            //        int orderId = x.id_order;

            //        using ( var dbContext = new ApplicationContext ( ) )
            //        {

            //            Order order = await dbContext.Orders.Where(o => o.OrderId == orderId).FirstOrDefaultAsync();
            //            Client client = await dbContext.Clients.Where(c => c.ClientId == clientId).FirstOrDefaultAsync();

            //            List<int> idDishes = new List<int>(); List<int> countDishes = new List<int>();
            //            if ( JsonConvert.DeserializeObject<List<int>> ( order.DishIdJson ) != null )
            //            {
            //                countDishes.AddRange ( JsonConvert.DeserializeObject<List<int>> ( order.DishCount ) );
            //                idDishes.AddRange ( JsonConvert.DeserializeObject<List<int>> ( order.DishIdJson ) );
            //            }

            //            List<int> idPizzas = new List<int>(); List<int> idSizePizzas = new List<int>(); List<int> countPizzas = new List<int>();
            //            List<List<int>> ingredients_array = new List<List<int>>();
            //            if ( JsonConvert.DeserializeObject<List<int>> ( order.PizzaIdJson ) != null )
            //            {
            //                ingredients_array.AddRange ( JsonConvert.DeserializeObject<List<List<int>>> ( order.PizzaIngredientIdJson ) );
            //                idPizzas.AddRange ( JsonConvert.DeserializeObject<List<int>> ( order.PizzaIdJson ) );
            //                idSizePizzas.AddRange ( JsonConvert.DeserializeObject<List<int>> ( order.PizzaSizeIdJson ) );
            //                countPizzas.AddRange ( JsonConvert.DeserializeObject<List<int>> ( order.PizzaCount ) );
            //            }

            //            try
            //            {
            //                MailAddress from = new MailAddress("delm0n@mail.ru", "Pizzeria");
            //                MailAddress to = new MailAddress(client.Email);
            //                MailMessage m = new MailMessage(from, to);

            //                // тема письма
            //                m.Subject = "Отчёт о покупке №" + orderId;
            //                m.IsBodyHtml = true;
            //                m.Body = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0; padding: 0\">" +

            //                "<tr><td style=\"padding: 10px; \"></td><td style=\"padding: 10px; \"><a href=\"http://localhost:4200\" style=\"color: #00dab6; line-height: 30px; -webkit-text-size-adjust:none; display: block;\" target=\"_blank\">Закажите пиццу на нашем сайте</a><td></tr>";

            //                for ( int i = 0; i < idPizzas.Count; i++ )
            //                {
            //                    int idPizza_dynamic = idPizzas[i];
            //                    Pizza pizza = await dbContext.Pizzas.FirstOrDefaultAsync(p => p.PizzaId == idPizza_dynamic);

            //                    int idPizzaSize_dynamic = idSizePizzas[i];
            //                    PizzaSize pizzaSize = await dbContext.PizzaSizes.FirstOrDefaultAsync(s => s.PizzaSizeId == idPizzaSize_dynamic);

            //                    m.Body += "<tr>";
            //                    m.Body += "<td style=\"padding: 10px; \"><i><b>" + pizza.PizzaName + "</b> - " + pizzaSize.NameSize + "</i></td>";
            //                    //m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.NameSize + "</i></td>";
            //                    m.Body += "<td style=\"padding: 10px; \"><i>" + pizzaSize.Price * countPizzas[i] + " рублей" + "</i></td>";
            //                    m.Body += "<td style=\"padding: 10px; \"><i>" + countPizzas[i] + " шт." + "</i></td>";
            //                    m.Body += "</tr>";


            //                    for ( int j = 0; j < ingredients_array[i].Count; j++ )
            //                    {
            //                        int idIngr_dynamic = ingredients_array[i][j];
            //                        Ingredient ingredient = await dbContext.Ingredients.FirstOrDefaultAsync(ing => ing.IngredientId == idIngr_dynamic);

            //                        //m.Body += "<tr><td style=\"padding: 10px; \"></td>";
            //                        m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Name + "</i></td>";
            //                        m.Body += "<td style=\"padding: 10px; \"><i>" + ingredient.Price + " рублей" + "</i></td>";
            //                        m.Body += "</tr>";
            //                    }

            //                }

            //                for ( int i = 0; i < idDishes.Count; i++ )
            //                {
            //                    int idDish_dynamic = idDishes[i];
            //                    Dish dish = await dbContext.Dishes.FirstOrDefaultAsync(d => d.DishId == idDish_dynamic);

            //                    m.Body += "<tr>";
            //                    m.Body += "<td style=\"padding: 10px; \"><b><i>" + dish.Name + "</i></b></td>";
            //                    //m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price + "</i></td>";
            //                    m.Body += "<td style=\"padding: 10px; \"><i>" + dish.Price * countDishes[i] + " ₽" + "</i></td>";
            //                    m.Body += "<td style=\"padding: 10px; \"><i>" + countDishes[i] + " шт." + "</i></td>";
            //                    m.Body += "</tr>";

            //                }

            //                m.Body += "<tr><td style=\"padding: 10px; \">Тип оплаты: " + order.TypeOfPay + "</td></tr>";
            //                m.Body += "<tr><td style=\"padding: 10px; \">Дата: " + order.DateOrder + "</td></tr>";
            //                m.Body += "<tr><td style=\"padding: 10px; \"><b>Итоговая сумма заказа: " + order.LastPrice + " ₽</b></td></tr>";

            //                m.Body += "</table>";

            //                SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

            //                smtp.Credentials = new NetworkCredential ( "delm0n@mail.ru", "e0LEpm1e731bLGYjvu3Q" );
            //                smtp.EnableSsl = true;
            //                smtp.Send ( m );

            //            }
            //            catch ( Exception ex )
            //            {
            //                return new Response { StatusCode = Nancy.HttpStatusCode.ServiceUnavailable };
            //            }

            //            return new Response { StatusCode = Nancy.HttpStatusCode.OK };
            //        }

            //    }
            //    else
            //    {
            //        return new Response ( ) { StatusCode = Nancy.HttpStatusCode.Unauthorized };
            //    }
            //};

        }
    }
}
