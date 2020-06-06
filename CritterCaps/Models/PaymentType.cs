using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class PaymentType
    {
        public int PaymentID { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }
        public int AccountNumber { get; set; }
    }
}
