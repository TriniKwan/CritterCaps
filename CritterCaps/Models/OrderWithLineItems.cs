using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class OrderWithLineItems
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public IEnumerable<LineItem> LineItem { get; set; }
        public decimal Total { get; set; }
        public string PaymentType { get; set; }
    }

    public class OrderInProgressWithLineItems
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public IEnumerable<LineItem> LineItem { get; set; }
        public decimal Total { get; set; }
    }

}
