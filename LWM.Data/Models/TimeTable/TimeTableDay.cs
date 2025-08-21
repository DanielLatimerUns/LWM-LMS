namespace LWM.Data.Models.TimeTable;

public class TimeTableDay : IDbEntity
{
    public int Id { get; set; }
    public required int DayOfWeek { get; set; }
    
    public TimeTable TimeTable { get; set; }
    public int TimeTableId { get; set; }
    
    public ICollection<TimeTableEntry> TimeTableEntries { get; set; } = [];
}