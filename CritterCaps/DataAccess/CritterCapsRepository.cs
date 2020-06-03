using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using CritterCaps.Models;


namespace CritterCaps.DataAccess
{
    public class CritterCapsRepository
    {
        string ConnectionString = "Server = localhost; Database = CandyMarket; Trusted_Connection = True;";
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
    }
}
