using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public string TypeOfPay { get; set; }
        public string OrderDate { get; set; }
        public double LastPrice { get; set; }

        public string PizzasJson { get; set; }
        public string ConstructorPizzasJson { get; set; }
        public string DishesJson { get; set; }

        public string Promocode { get; set; } = "";

        public string Status { get; set; }


    }
}
