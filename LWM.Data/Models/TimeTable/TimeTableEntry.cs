using LWM.Data.Models.Person;

namespace LWM.Data.Models.TimeTable;

public class TimeTableEntry : IDbEntity
{
    public int Id { get; set; }
    public required TimeOnly StartTime { get; set; }
    public required TimeOnly EndTime { get; set; }
    public int DayNumber { get; set; }
    
    public Group.Group Group { get; set; }
    public int GroupId { get; set; }
    
    public Teacher Teacher { get; set; }
    public int TeacherId { get; set; }
}