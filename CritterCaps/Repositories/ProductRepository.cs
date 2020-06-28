using CritterCaps.Models;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CritterCaps.Repositories
{
    public class ProductRepository
    {
        string ConnectionString;

        public ProductRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }

        public IEnumerable<Product> GetAllProducts()
        {
            var sql = @"SELECT ProductId, Title, [Description], Quantity, Price, imageUrl, inStock, Category, AnimalType
                        FROM Products
	                        JOIN ProductType
	                        ON ProductType.ProductTypeId = Products.ProductTypeId
	                        JOIN AnimalType
	                        ON AnimalType.AnimalId = Products.AnimalTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var products = db.Query<Product>(sql);

                return products;
            }
        }

        public Product GetSingleProduct(int productId)
        {
            var sql = @"SELECT ProductId, Products.ProductTypeId, Products.AnimalTypeId, Title, [Description], Quantity, Price, imageUrl, inStock, Category, AnimalType
                        FROM Products
	                        JOIN ProductType
	                        ON ProductType.ProductTypeId = Products.ProductTypeId
	                        JOIN AnimalType
	                        ON AnimalType.AnimalId = Products.AnimalTypeId
                        WHERE ProductId = @productId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var product = db.QueryFirstOrDefault<Product>(sql, new { ProductId = productId });

                return product;
            }
        }

        public ProductDBInfo AddProduct(ProductDBInfo productToAdd)
        {
            var sql = @$"insert into Products(ProductTypeId, AnimalTypeId, Title, [Description], Quantity, Price, imageUrl, inStock, DateAdded)
                        OUTPUT INSERTED.*
                        values (@ProductTypeId, @AnimalTypeId, @Title, @Description, @Quantity, @Price, @imageUrl, @InStock, '{DateTime.Now.ToShortDateString()}')";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<ProductDBInfo>(sql, productToAdd);
                return result;
            }
        }

        public ProductDBInfo UpdateSingleProduct(int productId, ProductDBInfo updatedProduct)
        {
            var sql = @"update Products
                        set Title=@Title, [Description]=@Description, Quantity=@Quantity, Price=@Price, imageUrl=@imageUrl, InStock=@InStock, ProductTypeId=@ProductTypeId, AnimalTypeId=@AnimalTypeId
                        where ProductId=@ProductId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    Title = updatedProduct.Title,
                    Description = updatedProduct.Description,
                    Quantity = updatedProduct.Quantity,
                    Price = updatedProduct.Price,
                    ImageUrl = updatedProduct.ImageUrl,
                    InStock = updatedProduct.InStock,
                    ProductTypeId = updatedProduct.ProductTypeId,
                    AnimalTypeId = updatedProduct.AnimalTypeId,
                    ProductId = productId
                };

                var result = db.QueryFirstOrDefault<ProductDBInfo>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<ProductWithBasicInfo> GetTop20NewestProducts()
        {
            var sql = @"Select TOP(20) ProductId, Title, Price, imageUrl, Description, DateAdded
                        FROM Products
                        WHERE inStock = 1
                        ORDER BY DateAdded DESC";

            using (var db = new SqlConnection(ConnectionString))
            {
                var products = db.Query<ProductWithBasicInfo>(sql);

                return products;
            }
        }

        public IEnumerable<ProductWithBasicInfo> GetAllAvailableProducts()
        {
            var sql = @"Select ProductId, Title, Price, imageUrl, Description, DateAdded
                        FROM Products
                        WHERE inStock = 1
                        ORDER BY DateAdded DESC";

            using (var db = new SqlConnection(ConnectionString))
            {
                var availProducts = db.Query<ProductWithBasicInfo>(sql);

                return availProducts;
            }
        }

        public IEnumerable<InventoryByCategory> TotalInventoryByCategory()
        {
            var sql = @"select Products.ProductTypeId, Category, sum(quantity) as TotalProducts
                        from Products
                        join ProductType
                        on Products.ProductTypeId = ProductType.ProductTypeId
                        group by Category, Products.ProductTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var totals = db.Query<InventoryByCategory>(sql);

                return totals;
            }
        }

        public IEnumerable<TotalSalesForEachItem> GetTotalSalesForEachItem()
        {
            var sql = @"select Products.Title, sum(UnitPrice) as ItemSales
                        from [Order]
                        join LineItem
                        on LineItem.OrderId = [Order].OrderId
                        join Products
                        on LineItem.ProductId = Products.ProductId
                        group by Products.Title
                        order by ItemSales desc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var totals = db.Query<TotalSalesForEachItem>(sql);

                return totals;
            }
        }
    }
}
