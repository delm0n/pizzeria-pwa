using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class ConstructorPizza
    {
        [Key]
        public int PizzaId { get; set; }

        public string NameSize { get; set; }

        public decimal Price { get; set; }

        public int Mass { get; set; }

    }
}
