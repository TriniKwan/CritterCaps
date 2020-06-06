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
    public class PaymentTypeRepository
    {
        string ConnectionString;

        public PaymentTypeRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }

        public PaymentType GetPaymentTypeById(int paymentId)
        {
            var sql = @"SELECT PaymentId
                        FROM PaymentType
                        where PaymentID = @paymentId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var paymentType = db.QueryFirstOrDefault<PaymentType>(sql, new { PaymentId = paymentId});
                return paymentType;
            }
        }
    }
}