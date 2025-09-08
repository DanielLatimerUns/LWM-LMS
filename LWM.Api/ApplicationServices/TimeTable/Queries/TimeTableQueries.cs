using LWM.Api.Dtos;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.ApplicationServices.TimeTable.Queries;

public interface ITimeTableQueries
{
    Task<List<TimeTableModel>> GetTimeTablesAsync();
    Task<TimeTableModel> GetTimeTableByIdAsync(int id);
    Task<Data.Models.TimeTable.TimeTable?> GetPublishedTimeTableForWeek(int week);
}

public class TimeTableQueries(CoreContext context) : ITimeTableQueries
{
    public async Task<List<TimeTableModel>> GetTimeTablesAsync()
    {
        return await context.TimeTables
            .Select(x => x.ToModel())
            .ToListAsync();
    }

    public async Task<TimeTableModel> GetTimeTableByIdAsync(int id)
    {
        var timetable = await context.TimeTables
            .Include(x => x.TimeTableEntries)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (timetable is null)
            throw new BadRequestException("Timetable not found");

        return timetable.ToModel();
    }
    
    public async Task<Data.Models.TimeTable.TimeTable?> GetPublishedTimeTableForWeek(int week)
    {
        var timetable = await context.TimeTables.FirstOrDefaultAsync(x => x.IsPublished);
        if (timetable is null)
        {
            return null;
        }

        var timeTablePublishedWeek = timetable.PublishedFrom.YearWeek();

        if (timeTablePublishedWeek > week)
        {
            return null;
        }
        
        var timeTableWithEntries = await context.TimeTables
            .Include(x => x.TimeTableEntries)
            .ThenInclude(y => y.ScheduleInstances.Where(x => x.WeekNumber == week))
            .FirstOrDefaultAsync(x => x.IsPublished);

        return timeTableWithEntries ?? null;
    }
}