using System;
using CritterCaps.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CritterCaps.Repositories
{
    public class AnimalRepository
    {
        string ConnectionString;

        public AnimalRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CritterCaps");
        }
        public IEnumerable<Animal> GetAllAnimals()
        {
            var sql = @"select *
                        from AnimalType";

            using (var db = new SqlConnection(ConnectionString))
            {
                var animals = db.Query<Animal>(sql);

                return animals;
            }
        }

        public Animal GetSingleAnimal(string animalType)
        {
            var sql = @"select AnimalType
                        from AnimalType
                        where AnimalType = @animalType;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var animal = db.QueryFirstOrDefault<Animal>(sql, new { AnimalType = animalType });

                return animal;
            }
        }
    }
}
