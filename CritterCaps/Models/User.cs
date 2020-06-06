using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CritterCaps.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName  { get; set; }
        public string LastName { get; set; }
        public DateTime AccountDate { get; set; }
        public bool Administrator { get; set; }
    }
}
