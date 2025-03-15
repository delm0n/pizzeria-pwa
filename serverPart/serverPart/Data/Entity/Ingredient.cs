using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Ingredient
    {
        [Key]
        public int IngredientId { get; set; }

        [Required]
        public string Name { get; set; }

        public string UrlImg { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
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
