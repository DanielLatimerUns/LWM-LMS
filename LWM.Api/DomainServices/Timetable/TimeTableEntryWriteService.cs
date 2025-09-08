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
            .Include(x => x.TimeTableEntries)
            .FirstOrDefaultAsync(x => x.Id == model.TimeTableId);
        
        if (timetable == null)
            throw new BadRequestException("Timetable not found");
        
        
        timetable.TimeTableEntries.Add(new TimeTableEntry
        {
            GroupId = model.GroupId,
            EndTime = TimeOnly.Parse(model.EndTime),
            StartTime = TimeOnly.Parse(model.StartTime),
            TeacherId = model.TeacherId,
            DayNumber = model.DayNumber
        });
        
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TimeTableEntryModel model)
    {
        var entry = context.TimeTableEntries.FirstOrDefault(x => x.Id == model.Id);
        
        if (entry == null)
            throw new BadRequestException("Timetable entry not found");
        
        entry.GroupId = model.GroupId;
        entry.EndTime = TimeOnly.Parse(model.EndTime);
        entry.StartTime = TimeOnly.Parse(model.StartTime);
        entry.DayNumber = model.DayNumber;
        
        await context.SaveChangesAsync();
    }

    public Task DeleteAsync(int id)
    {
        var entry = context.TimeTableEntries.FirstOrDefault(x => x.Id == id);
        if (entry == null)
            throw new BadRequestException("Timetable entry not found");
        
        context.TimeTableEntries.Remove(entry);
        return context.SaveChangesAsync();
    }
}