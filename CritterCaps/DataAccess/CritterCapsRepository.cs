using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using CritterCaps.Models;
using Microsoft.Extensions.Configuration;


namespace CritterCaps.DataAccess
{
    public class CritterCapsRepository
    {
        string ConnectionString;

        public CritterCapsRepository(IConfiguration config)
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

        public ProductType GetSingleProductType(string productType)
        {
            var sql = @"select *
                        from ProductType
                        where Category = @productType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var singleProductType = db.QueryFirstOrDefault<ProductType>(sql, new { ProductType = productType });
                return singleProductType;
            }
        }
    }
}
