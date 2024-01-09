using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class Student
    {
        public int Id { get; set; }

        public Person Person { get; set; }
    }
}
