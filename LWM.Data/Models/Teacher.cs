using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        public Person? Person { get; set; }
    }
}
