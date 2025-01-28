using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace serverPart.Data.Entity
{
    public class PizzaSize
    {
        [Key]
        public int PizzaSizeId { get; set;}
        public string NameSize { get; set; }
        public decimal Price { get; set; }
        public int Mass { get; set; }

        public int PizzaId { get; set;}

        [JsonIgnore] // Use this for System.Text.Json
        public virtual  Pizza Pizza { get; set; }
    }
}
