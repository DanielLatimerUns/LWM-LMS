using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class LessonDocument
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public object DocumentPath { get; set; }
    } 
}
