using NPOI.SS.Formula.Functions;
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

        [ForeignKey ( "Client" )]
        public int? ClientId { get; set; }
        public Client Client { get; set; }

        public string OrderName { get; set; } = "";
        
        [Required]
        public string OrderTelephone { get; set; }

        public string Time { get; set; } // доставка ко времени
        public string TypeOfPay { get; set; } // тип оплаты
        public string OrderDate { get; set; } // дата, время

        [ForeignKey ( "Promocode" )]
        public int? PromocodeId { get; set; }
        public Promocode Promocode { get; set; }
        public int Bonus { get; set; } = 0; // для истории списания/пополнения

        [Required]
        public double LastPrice { get; set; } 

        public string PizzasJson { get; set; } = "[]";
        public string ConstructorPizzasJson { get; set; } = "[]";
        public string DishesJson { get; set; } = "[]";

        public string Comment { get; set; } = "";
        public string Status { get; set; }

        public string Address { get; set; }  // адрес доставки если есть
        public string Pickup { get; set; } // адрес самовывоза если есть


    }
}
