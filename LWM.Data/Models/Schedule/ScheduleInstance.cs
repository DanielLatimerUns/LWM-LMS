using System.ComponentModel.DataAnnotations;
using LWM.Data.Models.TimeTable;

namespace LWM.Data.Models.Schedule
{
    public class ScheduleInstance : IDbEntity
    {
        public int Id { get; set; }

        public Lesson.Lesson? Lesson { get; set; }
        public int? LessonId { get; set; }

        public ScheduleItem? ScheduleItem { get; set; }
        public int? ScheduleItemId { get; set; }

        public DateTime ScheduledDateTime { get; set; }
        public int WeekNumber { get; set; }
        public bool IsCancelled { get; set; }
        
        public TimeTableEntry? TimeTableEntry { get; set; }
        public int? TimeTableEntryId { get; set; }
        
        public string? Notes { get; set; }
    }
}
