using LWM.Data.Models.TimeTable;

namespace LWM.Data.Models.Schedule
{
    public class ScheduleInstance : IDbEntity
    {
        public int Id { get; set; }

        public Lesson.Lesson? Lesson { get; set; }
        public required int LessonId { get; set; }

        public required ScheduleItem ScheduleItem { get; set; }
        public required int ScheduleItemId { get; set; }

        public DateTime ScheduledDateTime { get; set; }
        public bool IsCancelled { get; set; }
        
        public TimeTableEntry? TimeTableEntry { get; set; }
        public int? TimeTableEntryId { get; set; }    }
}
