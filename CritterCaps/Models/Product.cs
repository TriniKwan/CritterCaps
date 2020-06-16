using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public bool InStock { get; set; }
        public string Category { get; set; }
        public string AnimalType { get; set; }
    }

    public class ProductWithBasicInfo
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
