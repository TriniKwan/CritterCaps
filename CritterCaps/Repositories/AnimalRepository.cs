using System;
using CritterCaps.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace CritterCaps.Repositories
{
    public class AnimalRepository
    {
        string connectionString = "Server=localhost;Database=CritterCaps;Trusted_Connection=True;";

        public IEnumerable<Animal> GetAllAnimals()
        {
            var sql = @"select *
                        from AnimalType";

            using (var db = new SqlConnection(connectionString))
            {
                var animals = db.Query<Animal>(sql);

                return animals;
            }
        }
    }
}
