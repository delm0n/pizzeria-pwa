using Nancy.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace serverPart.Data.Entity
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        [Required] 
        public string FirstName { get; set; } //имя   

        [Required] 
        public string Telephone { get; set; }

        public string Email { get; set; }

        [Required] 
        public string Password { get; set; }

        public string PizzaOrderJson { get; set; } = "[]"; //массив id пицц, которые заказывал клиент

        public string PromocodeJson { get; set; } = "[]";  //массив id промокодов, которые использовал клиент

        public int Bonus { get; set; } = 0; // бонусный счёт

        public int Record { get; set; } = 0; // рекорд в игре
        public bool CanPlay { get; set; } = false; // возможность сыграть на бонусы по умолчанию false ставится true после заказа

    }
}
