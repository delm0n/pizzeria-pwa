using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace serverPart.Data.Entity
{
    public class SizePizza
    {
        public int PizzaSizeId { get; set;}
        public string NameSize { get; set; }
        public decimal Price { get; set; }
        public int Mass { get; set; }

        public SizePizza(PizzaSize pizzaSize)
        {
            this.PizzaSizeId = pizzaSize.PizzaSizeId;
            this.NameSize = pizzaSize.NameSize;
            this.Price = pizzaSize.Price;
            this.Mass = pizzaSize.Mass;
        }
    }
}
