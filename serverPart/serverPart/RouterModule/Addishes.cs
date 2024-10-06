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
                List<PizzaAll> pizzasAll = new List<PizzaAll>();

                using ( var dbContext = new ApplicationContext ( ) )
                {
                    List<Pizza> pizzas = await dbContext.Pizzas.OrderBy(p => p.MinPrice).ToListAsync(); //все пиццы
                    List<PizzaSize> pizzaSize = await dbContext.PizzaSizes.ToListAsync(); //все размеры всех пицц

                    for ( int i = 0; i < pizzas.Count; i++ )
                    {
                        PizzaAll item = new PizzaAll(pizzas[i]);
                        List<SizePizza> sizes = new List<SizePizza>();

                        //нужные три размера пиццы
                        List<PizzaSize> itemSizes = pizzaSize.Where(p => p.PizzaId == pizzas[i].PizzaId).ToList();
                        foreach ( var val in itemSizes )
                            sizes.Add ( new SizePizza ( val ) );

                        item.PizzaSizes = sizes;
                        pizzasAll.Add ( item );
                    }
                }

                return JsonSerializer.Serialize ( pizzasAll );

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
