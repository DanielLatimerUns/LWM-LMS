using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class Group
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CompletedLessonNo { get; set; }

        public Teacher Teacher { get; set; }

        public ICollection<Student>? Students { get; set; }
    }
}
