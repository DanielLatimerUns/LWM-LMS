using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class LessonInstance
    {
        public int Id { get; set; }

        public Lesson Lesson { get; set; }

        public LessonSchedule LessonSchedule { get; set; }

        public DateTime SchedualedDateTime { get; set; }
    }
}
