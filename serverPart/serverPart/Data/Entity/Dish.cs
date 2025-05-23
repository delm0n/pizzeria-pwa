﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Dish
    {
        [Key]
        public int DishId { get; set; }

        [Required]
        public string Name { get; set; }

        public string UrlImg { get; set; }

        public string Structure { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Mass { get; set; }

        public TypesEnum DishType { get; set; }

        public enum TypesEnum
        {
            Drinks = 0,
            Desserts = 1,
            Snacks = 2,
            Coffee = 3,
            Sauce = 4
        }

    }
}
