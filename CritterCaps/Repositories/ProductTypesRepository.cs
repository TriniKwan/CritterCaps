using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using CritterCaps.Models;
using Microsoft.Extensions.Configuration;


namespace CritterCaps.Repositories
{
    public class ProductTypesRepository
    {
        string ConnectionString;

        public ProductTypesRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }
        public List<ProductType> GetAllProductTypes()
        {
            var sql = @"select *
                        from ProductType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var productTypes = db.Query<ProductType>(sql).ToList();
                return productTypes;
            }
        }

        public ProductTypeWithProducts GetSingleProductTypeWithProducts(int productType)
        {
            var sql = @"select *
                        from ProductType
                        where ProductTypeId = @productType";

            var productsQuery = @"SELECT ProductId, Title, [Description], Quantity, Price, imageUrl, inStock, Category, AnimalType
                        FROM Products
	                        JOIN ProductType
	                        ON ProductType.ProductTypeId = Products.ProductTypeId
	                        JOIN AnimalType
	                        ON AnimalType.AnimalId = Products.AnimalTypeId
                            where ProductType.ProductTypeId = @productType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var singleProductType = db.QueryFirstOrDefault<ProductTypeWithProducts>(sql, new { ProductType = productType });
                var products = db.Query<Product>(productsQuery, new { ProductType = productType });

                singleProductType.Products = products;

                return singleProductType;
            }
        }

        public ProductType GetSingleProductType(int productType)
        {
            var sql = @"select *
                        from ProductType
                        where ProductTypeId = @productType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var singleProductType = db.QueryFirstOrDefault<ProductType>(sql, new { ProductType = productType });

                return singleProductType;
            }
        }
    }
}
