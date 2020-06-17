using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class ProductType
    {
        public string Category { get; set; }
        public int ProductTypeId { get; set; }
    }

    public class ProductTypeWithProducts
    {
        public int ProductTypeId { get; set; }
        public IEnumerable<Product> Products { get; set; }

    }
}
