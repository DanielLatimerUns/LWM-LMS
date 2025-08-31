namespace LWM.Api.Dtos.Models;

public class TimeTableEntryModel
{
    public int Id { get; set; }
    public int DayNumber { get; set; }
    public int TimeTableId { get; set; }
    public int GroupId { get; set; }
    public int TeacherId { get; set; }
    public required string StartTime { get; set; }
    public required string EndTime { get; set; }
}