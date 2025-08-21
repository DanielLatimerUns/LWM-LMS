using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;
using LWM.Data.Models.TimeTable;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.Timetable;

public interface ITimeTableEntryWriteService : IWriteService<TimeTableEntryModel>;

public class TimeTableEntryWriteService(CoreContext context) : ITimeTableEntryWriteService
{
    public async Task CreateAsync(TimeTableEntryModel model)
    {
        var timetable = await context
            .TimeTables
            .Include(x => x.Days).ThenInclude(x => x.TimeTableEntries)
            .FirstOrDefaultAsync(x => x.Id == model.TimeTableId);
        
        if (timetable == null)
            throw new BadRequestException("Timetable not found");
        
        if (timetable.Days.All(x => x.Id != model.TimeTableDayId))
            throw new BadRequestException("Timetable day not found");

        var day = timetable.Days.First(x => x.Id == model.TimeTableDayId);
        
        day.TimeTableEntries.Add(new TimeTableEntry
        {
            GroupId = model.GroupId,
            EndTime = model.EndTime,
            StartTime = model.StartTime,
            TimeTableDayId = model.TimeTableDayId
        });
    }

    public async Task UpdateAsync(TimeTableEntryModel model)
    {
        var entry = context.TimeTableEntries.FirstOrDefault(x => x.Id == model.Id);
        
        if (entry == null)
            throw new BadRequestException("Timetable entry not found");
        
        entry.GroupId = model.GroupId;
        entry.EndTime = model.EndTime;
        entry.StartTime = model.StartTime;
        entry.TimeTableDayId = model.TimeTableDayId;
        
        await context.SaveChangesAsync();
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}