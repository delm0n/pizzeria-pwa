using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Promocode
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(6)]
        public string Value { get; set; }

        public int Price { get; set; }

        public int? Discount {  get; set; }
    }
}
