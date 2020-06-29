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

        /// <summary>
        /// Gets all orders with User Name.
        /// </summary>
        /// <returns>All Orders</returns>
        public IEnumerable<Orders> GetAllOrders()
        {
            var sql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total, PaymentType.[Type] AS PaymentType
                         FROM[Order]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            JOIN PaymentType
                            ON PaymentType.PaymentID = [Order].PaymentType
                            ORDER BY InvoiceDate desc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var orders = db.Query<Orders>(sql);

                return orders;
            }
        }

        /// <summary>
        /// Returns a single order with line items and user name.
        /// </summary>
        /// <param name="orderId">Int that corresponds with an order ID.</param>
        /// <returns>A single order with line items</returns>
        public OrderWithLineItems GetSingleOrder(int orderId)
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total, PaymentType.[Type] AS PaymentType
                         FROM[Order]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            JOIN PaymentType
                            ON PaymentType.PaymentID = [Order].PaymentType
                        WHERE [Order].OrderId = @orderId";

            var lineItem = $@"SELECT [Order].OrderId, LineItem.LineItemtId, Products.ProductId, Products.Title, LineItem.UnitPrice
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

                if (order != null)
                {
                    if (lineItems.Any())
                    {
                        order.LineItem = lineItems;
                    }
                }

                return order;
            }
        }

        /// <summary>
        /// Gets an order that is open with any existing line items.
        /// </summary>
        /// <param name="orderId">Int that corresponds with an order ID.</param>
        /// <returns>A single order in progress with line items.</returns>
        public OrderInProgressWithLineItems GetPendingOrder(int orderId)
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total
                            FROM [ORDER]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                        WHERE [Order].OrderId = @orderId";

            var lineItem = $@"SELECT [Order].OrderId, Products.ProductId, Products.Title, LineItem.UnitPrice, LineItem.LineItemtId
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

        /// <summary>
        /// Gets the base order information - OrderId, UserId, InvoiceDate, and Total.
        /// </summary>
        /// <param name="orderId">Int that corresponds with an order ID.</param>
        /// <returns>Basic order information</returns>
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

        /// <summary>
        /// Checks for any existing orders that are open for a given user.
        /// </summary>
        /// <param name="userId">Int that corresponds with UserId</param>
        /// <returns>Any open order for the given user.</returns>
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

        /// <summary>
        /// Creates a new order with no line items, total, or payment.
        /// </summary>
        /// <param name="userId">Int userId to associate with order</param>
        /// <returns>New blank order</returns>
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

        /// <summary>
        /// Adds line items to an open order.
        /// </summary>
        /// <param name="orderId">Id for Order to add to</param>
        /// <param name="productId">Id for product to add</param>
        /// <returns>Order in progress with added line items</returns>
        public OrderInProgressWithLineItems AddLineItem(int orderId, int productId)
        {
            var sql = @"insert into LineItem (OrderId, ProductId, UnitPrice)
                        SELECT @orderId, @productId, Products.Price
                        FROM Products
                        WHERE ProductId = @productId";

            var totalSql = @"SELECT OrderId, sum(UnitPrice) AS Total
                            FROM LineItem
                            WHERE OrderId = @orderId
                            GROUP BY OrderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { OrderId = orderId, ProductId = productId });

                var updatedOrder = GetPendingOrder(orderId);
                var total = db.QueryFirstOrDefault<OrderTotal>(totalSql, new { OrderId = orderId });

                UpdateTotal(total.Total, orderId);
                return updatedOrder;
            }
        }

        /// <summary>
        /// Check to see if an order is completed
        /// </summary>
        /// <param name="orderId">Int that corresponds with an order ID.</param>
        /// <returns>Open order</returns>
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

        /// <summary>
        /// Updates the total
        /// </summary>
        /// <param name="total">Total passed down from AddLineItem</param>
        /// <param name="orderId">Int Id for Order to update</param>
        public void UpdateTotal(decimal total, int orderId)
        {
            var sql = @"UPDATE[Order]
                        SET Total = @total
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.QueryFirstOrDefault(sql, new { OrderId = orderId, Total = total});
            }
        }

        /// <summary>
        /// Completes order by adding paymentID to order.
        /// </summary>
        /// <param name="orderId">Order to update</param>
        /// <param name="type">Type of payment (string)</param>
        /// <returns>Completed order</returns>
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


        /// <summary>
        /// Gets all pending orders
        /// </summary>
        /// <returns>All pending orders with line items</returns>
        public IEnumerable<OrderInProgressWithLineItems> GetAllPendingOrders()
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total
                            FROM [ORDER]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            WHERE PaymentType IS NULL";

            var lineItem = $@"SELECT [Order].OrderId, Products.ProductId, Products.ProductId, Products.Title, LineItem.UnitPrice, LineItem.LineItemtId
                            FROM [Order]
	                            JOIN LineItem
	                            ON [Order].OrderId = LineItem.OrderId
	                            JOIN Products
	                            ON LineItem.ProductId = Products.ProductId
                            WHERE [Order].OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var orders = db.Query<OrderInProgressWithLineItems>(orderSql);

                foreach (var order in orders)
                {
                    var lineItems = db.Query<LineItem>(lineItem, new { OrderId = order.OrderId });

                    if (lineItems.Any())
                    {
                        order.LineItem = lineItems;
                    }
                }

                return orders;
            }
        }

        /// <summary>
        /// Removes a single line item
        /// </summary>
        /// <param name="orderId">OrderID to remove from</param>
        /// <param name="productId">ProductId to remove</param>
        /// <returns>Updated order</returns>
        public OrderInProgressWithLineItems RemoveLineItem(int orderId, int productId)
        {
            var sql = @"DELETE TOP(1)
                        FROM LineItem
                        WHERE OrderId = @orderId AND ProductId = @productId";

            var totalSql = @"SELECT OrderId, sum(UnitPrice) AS Total
                            FROM LineItem
                            WHERE OrderId = @orderId
                            GROUP BY OrderId";


            using (var db = new SqlConnection(ConnectionString))
            {
                db.ExecuteAsync(sql, new { OrderId = orderId, ProductId = productId });

                var total = db.QueryFirstOrDefault<OrderTotal>(totalSql, new { OrderId = orderId });

                UpdateTotal(total.Total, orderId);

                var updatedOrder = GetPendingOrder(orderId);
                return updatedOrder;
            }
        }

        /// <summary>
        /// Deletes all line items
        /// </summary>
        /// <param name="orderId">Order to delete items for</param>
        public void DeleteAllLineItems(int orderId)
        {
            var sql = @"DELETE
                        FROM LineItem
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                db.Query(sql, new { OrderId = orderId });
            }
        }

        /// <summary>
        /// Deletes order and line items
        /// </summary>
        /// <param name="orderId">order to delete</param>
        /// <returns>Task complete string</returns>
        public string DeleteOrder(int orderId)
        {
            var sql = @"DELETE
                        FROM [Order]
                        WHERE OrderId = @orderId";

            using (var db = new SqlConnection(ConnectionString))
            {
                DeleteAllLineItems(orderId);
                db.QueryFirstOrDefault(sql, new { OrderId = orderId });

                return ($"Successfully deleted order number {orderId}");
            }
        }

        public OrderInProgressWithLineItems GetOpenOrderByUserId(int userId)
        {
            var orderSql = $@"SELECT [Order].OrderId, [User].FirstName + ' ' + [User].LastName AS CustomerName, [Order].InvoiceDate, [Order].Total
                            FROM [ORDER]
                            JOIN[User]
                            ON[Order].UserId = [User].ID
                            WHERE PaymentType IS NULL AND [Order].UserId = @userId";

            var lineItem = $@"SELECT [Order].OrderId, Products.ProductId, Products.ProductId, Products.Title, LineItem.UnitPrice, LineItem.LineItemtId
                            FROM [Order]
	                            JOIN LineItem
	                            ON [Order].OrderId = LineItem.OrderId
	                            JOIN Products
	                            ON LineItem.ProductId = Products.ProductId
                            WHERE [Order].UserId = @UserId AND [Order].OrderId = @orderId";

            var totalSql = @"SELECT OrderId, sum(UnitPrice) AS Total
                            FROM LineItem
                            WHERE OrderId = @orderId
                            GROUP BY OrderId";


            using (var db = new SqlConnection(ConnectionString))
            {
                var order = db.QueryFirstOrDefault<OrderInProgressWithLineItems>(orderSql, new { UserId = userId });
                if (order != null)
                {
                    var orderId = order.OrderId;

                    var lineItems = db.Query<LineItem>(lineItem, new { UserId = userId, OrderId = orderId });

                    if (lineItems.Any())
                    {
                        order.LineItem = lineItems;
                        var total = db.QueryFirstOrDefault<OrderTotal>(totalSql, new { OrderId = orderId });
                        order.Total = total.Total;
                    }

                    return order;
                }

                return order;
            }
        }

        public SellerOrderTotal GetSales()
        {
            var sql = @"select sum(Total) as Total
                        from[Order];";

            using (var db = new SqlConnection(ConnectionString))
            {
                var total = db.QueryFirstOrDefault<SellerOrderTotal>(sql);

                return total;
            }
        }

        public SellerOrderTotal GetMonthlySales()
        {
            var sql = @"select month(InvoiceDate) as [Month], sum(Total) as Total
                    from[Order]
                    where month(InvoiceDate) = DATEPART(month, CURRENT_TIMESTAMP)
                    group by month(InvoiceDate)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var totalMonthlySales = db.QueryFirstOrDefault<SellerOrderTotal>(sql);

                return (totalMonthlySales);
            }
        }
    }
}
