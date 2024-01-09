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

        public IEnumerable<LessonDocument> LessonDocuments { get; set;}
    }
}
