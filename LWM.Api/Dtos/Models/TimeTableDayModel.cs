namespace LWM.Api.Dtos.Models;

public class TimeTableDayModel
{
    public int Id { get; set; }
    public int DayOfWeek { get; set; }
    public int TimeTableId { get; set; }
    public List<TimeTableEntryModel> TimeTableEntries { get; set; } = [];
}