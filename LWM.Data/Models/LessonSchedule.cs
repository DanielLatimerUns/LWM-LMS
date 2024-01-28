using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Data.Models
{
    public class LessonSchedule
    {
        public int Id { get; set; }

        public int SchedualedDayOfWeek { get; set; }

        public TimeOnly SchedualedStartTime { get; set; }

        public TimeOnly SchedualedEndTime { get; set; }

        public Group Group { get; set; }
    }
}
