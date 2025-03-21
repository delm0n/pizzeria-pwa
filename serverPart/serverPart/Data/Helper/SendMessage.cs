using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace serverPart.Data.Helper
{
    internal class SendMessage
    {
        public int Num { get; set; }
        public string Message { get; set; }
        public int Bonus { get; set; } = 0;
        public bool CanPlay { get; set; } = false;
    }
}
