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

        public OrderWithLineItems GetSingleOrder(int orderId)
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total, PaymentType.[Type] AS PaymentType
                         FROM[Order]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            JOIN PaymentType
                            ON PaymentType.PaymentID = [Order].PaymentType
                        WHERE [Order].OrderId = @orderId";

            var lineItem = $@"SELECT [Order].OrderId, Products.Title, LineItem.UnitPrice, LineItem.Quantity
                            FROM [Order]
	                            JOIN LineItem
	                            ON [Order].OrderId = LineItem.OrderId
	                            JOIN Products
	                            ON LineItem.ProductId = Products.ProductId
                            WHERE [Order].OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var order = db.QueryFirstOrDefault<OrderWithLineItems>(orderSql, new { OrderId = orderId });
                var lineItems = db.Query<LineItem>(lineItem, new { OrderId = orderId });

                order.LineItem = lineItems;

                return order;
            }
        }

        

    }
}
