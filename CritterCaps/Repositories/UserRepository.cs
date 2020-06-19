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

        public User GetUserByUid(string uid)
        {
            var sql = @"SELECT *
                       FROM [User]
                       WHERE [UID] = @uid";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UID = uid };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);

                return user;
            }
        }

        public User GetUserByEmail(string email)
        {
            var sql = @"SELECT *
                       FROM [User]
                       WHERE Email = @email";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Email = email };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);

                return user;
            }
        }


        public User Add(User user)
        {
            var sql = @"INSERT INTO [User](FirstName, LastName, AccountDate, Administrator, [UID], Email)
                        OUTPUT INSERTED.*
                        VALUES(@FirstName, @LastName, GetDate(), @Administrator, @UID, @Email)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<User>(sql, user);
                return result;
            }
        }
    }
}
    

