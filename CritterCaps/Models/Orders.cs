using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class Orders
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Total { get; set; }
        public string PaymentType { get; set; }
    }

    public class NewOrder
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
    }

    public class OrderCheck
    {
        public int OrderId { get; set; }
        public DateTime InvoiceDate { get; set; }
    }
}
