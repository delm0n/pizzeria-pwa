using Nancy;
using NPOI.HPSF;
using serverPart.Data;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace serverPart.RouterModule
{
    public class Addishes : NancyModule
    {
        public Addishes ( )
        {

            Get["/pizzas", runAsync: true] = async ( x, token ) =>
            {
                List<Pizza> pizzas = new List<Pizza>();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    pizzas = await dbContext.Pizzas.OrderBy(p => p.PizzaName ).ToListAsync(); //все пиццы
                    List<PizzaSize> pizzaSize = await dbContext.PizzaSizes.ToListAsync(); //все размеры всех пицц

                    for ( int i = 0; i < pizzas.Count; i++ )
                    {
                        //нужные три размера пиццы
                        pizzas[i].PizzaSizes = pizzaSize.Where(p => p.PizzaId == pizzas[i].PizzaId).ToList();
                    }
                }

                var json = JsonSerializer.Serialize ( pizzas );

                return json;

            };

            Get["/constructor-pizzas", runAsync: true] = async ( x, token ) =>
            {
                List<ConstructorPizza> constructorPizzas = new List<ConstructorPizza>();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    constructorPizzas = await dbContext.ConstructorPizzas.ToListAsync ( );
                }

                return JsonSerializer.Serialize ( constructorPizzas );
            };


            Get["/ingredients", runAsync: true] = async ( x, token ) =>
            {
                List<Ingredient> ingredients = new List<Ingredient>();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    ingredients = await dbContext.Ingredients.ToListAsync ( );             
                }

                return JsonSerializer.Serialize ( ingredients );
            };



            Get["/dishes", runAsync: true] = async ( x, token ) =>
              {

                  List<Dish> dishes = new List<Dish>();

                  using ( var dbContext = new ApplicationContext ( ) )
                  {
                      dishes = await dbContext.Dishes.OrderBy ( d => d.Name ).ToListAsync ( );
                  }

                  return JsonSerializer.Serialize ( dishes ); ;
              };
        }
    }
}
