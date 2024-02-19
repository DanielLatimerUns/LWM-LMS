using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class Lesson
    {
        public int Id { get; set;}

        public string Name { get; set;}

        public int LessonNo { get; set;}

        public Curriculum Curriculum { get; set;}

        public AzureObjectLink? AzureObjectLink { get; set; }

        public ICollection<Document> Documents { get; set;} = new List<Document>();
    }
}
