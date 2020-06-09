using CritterCaps.Models;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Security.Authentication;

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

            var lineItem = $@"SELECT [Order].OrderId, Products.Title, LineItem.UnitPrice
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

                if (lineItems.Any())
                {
                    order.LineItem = lineItems;
                }

                return order;
            }
        }

        public OrderInProgressWithLineItems GetPendingOrder(int orderId)
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total
                            FROM [ORDER]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                        WHERE [Order].OrderId = @orderId";

            var lineItem = $@"SELECT [Order].OrderId, Products.Title, LineItem.UnitPrice
                            FROM [Order]
	                            JOIN LineItem
	                            ON [Order].OrderId = LineItem.OrderId
	                            JOIN Products
	                            ON LineItem.ProductId = Products.ProductId
                            WHERE [Order].OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var order = db.QueryFirstOrDefault<OrderInProgressWithLineItems>(orderSql, new { OrderId = orderId });
                var lineItems = db.Query<LineItem>(lineItem, new { OrderId = orderId });

                if (lineItems.Any())
                {
                    order.LineItem = lineItems;
                }

                return order;
            }
        }


        public OrderWithBaseInfo GetBasicOrderInfo(int orderId)
        {
            var sql = $@"SELECT OrderId, UserId, InvoiceDate, Total
                            FROM [ORDER]
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var order = db.QueryFirstOrDefault<OrderWithBaseInfo>(sql, new { OrderId = orderId });

                return order;
            }
        }

        public IEnumerable<OrderCheck> CheckExistingOrder(int userId)
        {
            var sql = @"SELECT *
                        FROM [Order]
                        WHERE PaymentType IS NULL AND UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var checkForOpenOrder = db.Query<OrderCheck>(sql, new { UserId = userId });

                return checkForOpenOrder;
            }
        }

        public NewOrder CreateNewOrder(int userId)
        {
            var sql = $@"INSERT INTO [Order] (UserId, InvoiceDate)
                        OUTPUT INSERTED.OrderId
                        values (@userId, '{DateTime.Now}')";

            var newOrderSql = @"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate
                                 FROM[Order]
                                    JOIN[User]
                                    ON[Order].UserId = [User].ID
                                WHERE [Order].OrderId = @orderId";


            using (var db = new SqlConnection(ConnectionString))
            { 
                var orderId = db.QuerySingle<int>(sql, new { UserId = userId });

                var newOrder = db.QueryFirstOrDefault<NewOrder>(newOrderSql, new { OrderId = orderId });

                return newOrder;
            }
        }

        public OrderInProgressWithLineItems AddLineItem(int orderId, int productId)
        {
            var sql = @"insert into LineItem (OrderId, ProductId, UnitPrice)
                        SELECT @orderId, @productId, Products.Price
                        FROM Products
                        WHERE ProductId = @productId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { OrderId = orderId, ProductId = productId });
                

                var order = GetPendingOrder(orderId);
                decimal total = 0;

                foreach (var item in order.LineItem)
                {
                    total += item.UnitPrice;
                }

                UpdateTotal(total, orderId);

                var updatedOrder = GetPendingOrder(orderId);
                return updatedOrder;
            }
        }

        public IEnumerable<OrderCheck> CheckCompletedOrder(int orderId)
        {
            var sql = @"SELECT *
                        FROM [Order]
                        WHERE PaymentType IS NULL AND OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var checkForOpenOrder = db.Query<OrderCheck>(sql, new { OrderId = orderId });

                return checkForOpenOrder;
            }
        }

        public void UpdateTotal(decimal total, int orderId)
        {
            var sql = @"UPDATE[Order]
                        SET Total = @total
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { OrderId = orderId, Total = total });
            }
        }

        public OrderWithLineItems CompleteOrder(int orderId, string type)
        {
            var orderToUpdate = GetBasicOrderInfo(orderId);
            var paymentTypeSql = $@"SELECT *
                                    FROM PaymentType
                                    WHERE [Type] = @type AND UserId = {orderToUpdate.UserId}";
            var sql = $@"Update[Order]
                        SET PaymentType = @paymentType
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var payment = db.QueryFirstOrDefault<PaymentType>(paymentTypeSql, new { Type = type });
                var paymentType = payment.PaymentID;

                db.QueryFirstOrDefault(sql, new { OrderId = orderId, PaymentType = paymentType });

                var completedOrder = GetSingleOrder(orderId);

                return completedOrder;
            }
        }

    }
}
