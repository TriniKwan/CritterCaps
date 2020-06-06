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
    public class OrdersRepository
    {
        string ConnectionString;

        public OrdersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }

        public IEnumerable<Orders> GetAllOrders()
        {
            var sql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total, PaymentType.[Type] AS PaymentType
                         FROM[Order]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            JOIN PaymentType
                            ON PaymentType.PaymentID = [Order].PaymentType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var orders = db.Query<Orders>(sql);

                return orders;
            }
        }

    }
}
