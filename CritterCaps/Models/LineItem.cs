using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class LineItem
    {
        public int LineItemtId { get; set; }
        public int ProductId { get; set; }
        public string Title { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
