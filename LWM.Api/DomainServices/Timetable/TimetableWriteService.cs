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
            Name = model.Name,
            IsPublished = model.IsPublished,
        };
        
        context.Add(entity);
        
        Validate(entity);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TimeTableModel model)
    {
        var timetable = context.TimeTables
            .FirstOrDefault(x => x.Id == model.Id);

        if (model.IsPublished && context.TimeTables.Any(x => x.IsPublished && x.Id != model.Id))
        {
            throw new BadRequestException("Only one timetable can be published at a time.");
        }
        
        Validate(timetable);
        
        timetable!.Name = model.Name;
        timetable.IsPublished = model.IsPublished;
        
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var timetable = context.TimeTables
            .Include(x => x.TimeTableEntries)
            .FirstOrDefault(x => x.Id == id);
        Validate(timetable);
        
        timetable?.TimeTableEntries.Clear();
        context.TimeTables.Remove(timetable);
        
        await context.SaveChangesAsync();
    }

    private void Validate(TimeTable? model)
    {
        if (model is null || (context.TimeTables.Any(x => x.Name == model.Name) && model.Id == 0))
        {
            throw new BadRequestException("Timetable with this name already exists.");
        }
    }
}