namespace LWM.Api.Dtos.Models;

public class TimeTableEntryModel
{
    public int Id { get; set; }
    public int TimeTableDayId { get; set; }
    public int TimeTableId { get; set; }
    public int GroupId { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
}