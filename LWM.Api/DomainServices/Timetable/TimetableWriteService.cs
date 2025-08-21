using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;
using LWM.Data.Models.TimeTable;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.Timetable;

public interface ITimetableWriteService : IWriteService<TimeTableModel>;

public class TimetableWriteService(CoreContext context) : ITimetableWriteService
{
    public async Task CreateAsync(TimeTableModel model)
    {
        var entity = new TimeTable
        {
            Name = model.Name
        };
        
        model.Days.ForEach(x => entity.Days.Add(new TimeTableDay
        {
            DayOfWeek = x.DayOfWeek
        }));
        
        context.Add(entity);
        
        Validate(entity);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TimeTableModel model)
    {
        var timetable = context.TimeTables
            .Include(x => x.Days)
            .ThenInclude(x => x.TimeTableEntries)
            .FirstOrDefault(x => x.Id == model.Id);
        
        Validate(timetable);
        
        timetable!.Name = model.Name;

        foreach (var day in model.Days)
        {
            if (timetable.Days.Any(x => x.DayOfWeek == day.DayOfWeek)) 
                continue;
            
            timetable.Days.Add(new TimeTableDay
            {
                DayOfWeek = day.DayOfWeek
            });
        }

        foreach (var day in timetable.Days)
        {
            if (model.Days.Any(x => x.DayOfWeek == day.DayOfWeek)) 
                continue;
            
            day.TimeTableEntries.Clear();
            timetable.Days.Remove(day);
        }
        
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var timetable = context.TimeTables
            .Include(x => x.Days)
            .ThenInclude(x => x.TimeTableEntries)
            .FirstOrDefault(x => x.Id == id);
        Validate(timetable);
        
        foreach (var timeTableDay in timetable.Days)
        {
            timeTableDay.TimeTableEntries.Clear();
        }
        
        timetable.Days.Clear();
        context.TimeTables.Remove(timetable);
        
        await context.SaveChangesAsync();
    }

    private void Validate(TimeTable? model)
    {
        if (model is null || context.TimeTables.Any(x => x.Name == model.Name))
        {
            throw new BadRequestException("Timetable with this name already exists.");
        }
    }
}