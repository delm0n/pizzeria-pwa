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

        public int ClientId { get; set; }

        public string FirstName { get; set; } //имя   

        public string Telephone { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PizzaOrderJson { get; set; } = ""; //массив id пицц, которые заказывал клиент
        public string PromocodeJson { get; set; } = ""; //массив id промокодов, которые использовал клиент
            
        
    }
}
