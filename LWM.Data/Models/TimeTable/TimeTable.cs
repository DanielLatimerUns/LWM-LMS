namespace LWM.Data.Models.TimeTable;

public class TimeTable : IDbEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    
    public bool IsPublished { get; set; }
    public ICollection<TimeTableDay> Days { get; set; } = [];
}