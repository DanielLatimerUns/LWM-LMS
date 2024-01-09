using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class GroupStudent
    {
        public int Id { get; set; }

        public Group Group { get; set; }

        public Student Student { get; set; }
    }
}
