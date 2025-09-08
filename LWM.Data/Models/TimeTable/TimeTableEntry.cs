using LWM.Data.Models.Person;
using LWM.Data.Models.Schedule;

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
    public ICollection<ScheduleInstance> ScheduleInstances { get; set; } = [];
    
    public ScheduleInstance? GetScheduledInstanceForWeek(int weekNumber) =>
        ScheduleInstances.FirstOrDefault(x => x.WeekNumber == weekNumber);
}