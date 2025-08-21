using LWM.Data.Models;
using LWM.Data.Models.TimeTable;

namespace LWM.Api.Dtos.Models;

public class TimeTableModel
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool IsPublished { get; set; }
    public List<TimeTableDayModel> Days { get; set; } = [];
}