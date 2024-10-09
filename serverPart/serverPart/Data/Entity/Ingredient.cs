using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Ingredient
    {
        public int IngredientId { get; set; }

        public string Name { get; set; }

        public string UrlImg { get; set; }

        public decimal Price { get; set; }

        public int Mass { get; set; }

        public TypesIngredient Type { get; set; }

        public enum TypesIngredient
        {
            Cheese = 0,
            Meet = 1,
            Mushrooms = 2,
            Vegetables = 3,
            Fruit = 4
        }
    }
}
