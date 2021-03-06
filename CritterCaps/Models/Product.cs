﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public int AnimalTypeId { get; set; }
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

    public class ProductDBInfo
    {
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public int AnimalTypeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public bool InStock { get; set; }
        public DateTime DateAdded { get; set; }
    }

    public class InventoryByCategory
    {
        public int ProductTypeId { get; set; }
        public string Category { get; set; }
        public int TotalProducts { get; set; }
    }

    public class TotalSalesForEachItem
    {
        public string Title { get; set; }
        public decimal ItemSales { get; set; }
    }
}
