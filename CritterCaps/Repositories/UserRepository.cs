using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CritterCaps.Repositories
{
    public class UserRepository

    { 
        string ConnectionString;
    
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }
        public IEnumerable<User> GetAllUsers()
        {
            var sql = @"SELECT *
                        FROM [User]
	                     ";

            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<User>(sql);

                return users;
            }
        } 
        public User GetSingleUser(int Id)
        {
            var sql = @"SELECT *
                        FROM [User]
                        Where Id = @Id;
	                     ";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = Id };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);

                return user;
            }
        }
    }
}
    

