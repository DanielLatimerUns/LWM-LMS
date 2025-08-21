using LWM.Data.Models.TimeTable;

namespace LWM.Data.Models.Schedule
{
    public class ScheduleItem : IDbEntity
    {
        public int Id { get; set; }
        public int ScheduledDayOfWeek { get; set; }
        public int StartWeek { get; set; }
        public int Repeat { get; set; }
        public TimeOnly ScheduledStartTime { get; set; }
        public TimeOnly ScheduledEndTime { get; set; }

        public required Group.Group Group { get; set; }
        public int GroupId { get; set; }
        
        public TimeTableEntry? TimeTableEntry { get; set; }
        public int? TimeTableEntryId { get; set; }
    }
}
