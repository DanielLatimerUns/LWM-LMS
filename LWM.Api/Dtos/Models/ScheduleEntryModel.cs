namespace LWM.Api.Dtos.Models
{
    public class ScheduleEntryModel
    {
        public int Id { get; set; }
        public int? SchedualedDayOfWeek { get; set; }
        public string? SchedualedDayOfWeekName { get; set; }
        public string? SchedualedStartTime { get; set; }
        public string SchedualedEndTime { get; set; }
        public int? GroupId { get; set; }
        public int HourStart { get; set; }
        public int HourEnd { get; set; }
        public double DurationMinutes { get; set; }
        public int Repeat { get; set; }
        public int StartWeek { get; set; }
        public int MinuteEnd { get; set; }
        public int MinuteStart { get; set;}
        public int TimeTableEntryId { get; set; }
    }
}
