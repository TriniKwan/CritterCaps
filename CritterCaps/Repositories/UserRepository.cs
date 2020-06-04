using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace CritterCaps.Repositories
{
    public class UserRepository
    {
        string ConnectionString = "Server=localhost;Database=CritterCaps;Trusted_Connection=True;";

        public IEnumerable<UserRepository> GetAllUsers(int id)
        {
            var sql = @"SELECT *
                        FROM User
	                     ";

            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<UserRepository>(sql);

                return users;
            }
        }

    }
}
    

