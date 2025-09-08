namespace LWM.Api.Dtos.Models
{
    public class ScheduleEntryModel
    {
        public int Id { get; set; }
        public int? ScheduledDayOfWeek { get; set; }
        public string? ScheduledDayOfWeekName { get; set; }
        public string? ScheduledStartTime { get; set; }
        public string ScheduledEndTime { get; set; }
        public int? GroupId { get; set; }
        public int HourStart { get; set; }
        public int HourEnd { get; set; }
        public double DurationMinutes { get; set; }
        public int Repeat { get; set; }
        public int StartWeek { get; set; }
        public int MinuteEnd { get; set; }
        public int MinuteStart { get; set;}
        public int TimeTableEntryId { get; set; }
        public int ScheduleInstanceId { get; set; }
        public bool IsCancelled { get; set; }
        public string? Notes { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int InstanceWeekNumber { get; set; }
    }
}
