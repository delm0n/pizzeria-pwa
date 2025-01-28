using Newtonsoft.Json;
using serverPart.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Helper
{
    public class PizzaConstructorCart
    {
        public int PizzaId { get; set; }
        public int SauceId { get; set; }    
        public int Count { get; set; }
        public string IngredientsId { get; set; }

    }
}
