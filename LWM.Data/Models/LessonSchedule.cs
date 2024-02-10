namespace LWM.Data.Models
{
    public class LessonSchedule
    {
        public int Id { get; set; }

        public int SchedualedDayOfWeek { get; set; }

        public int StartWeek { get; set; }

        public int Repeat { get; set; }

        public TimeOnly SchedualedStartTime { get; set; }

        public TimeOnly SchedualedEndTime { get; set; }

        public Group Group { get; set; }
    }
}
