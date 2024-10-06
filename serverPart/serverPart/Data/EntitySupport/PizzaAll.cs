using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Threading.Tasks;


namespace serverPart.Data.Entity
{
    public class PizzaAll
    {

        public int PizzaId { get; set; }

        public string UrlImg {get;set;}

        public string PizzaName { get; set; }
        
        public string Structure { get; set; }

        public decimal MinPrice { get; set;}

        public List<SizePizza> PizzaSizes { get; set; }

        public int ÑountOrder { get; set; } 

        public PizzaAll(Pizza pizza)
        {
          this.PizzaId = pizza.PizzaId;
         
          this.PizzaName = pizza.PizzaName;
          this.Structure = pizza.Structure;
          this.MinPrice = pizza.MinPrice;
          this.UrlImg = pizza.UrlImg;
          this.ÑountOrder = pizza.ÑountOrder;
        }

    }
}
