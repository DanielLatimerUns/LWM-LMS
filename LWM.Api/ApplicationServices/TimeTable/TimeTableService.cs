using LWM.Api.DomainServices.Schedule.Contracts;
using LWM.Api.DomainServices.Timetable;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.ViewModels;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.ApplicationServices.TimeTable;

public interface ITimeTableService
{
    Task Create(TimeTableModel model);
    Task Update(TimeTableModel model);
    Task Delete(int id);
    Task AddEntry(TimeTableEntryModel model);
    Task UpdateEntry(TimeTableEntryModel model);
    Task DeleteEntry(int id);
    Task<IEnumerable<TimeTablePublishResponse>> Publish(int timeTableId);
}

public class TimeTableService(ITimetableWriteService timetableWriteService, 
    ITimeTableEntryWriteService entryWriteService,
    IScheduleWriteService scheduleWriteService,
    CoreContext context) : ITimeTableService
{
    public async Task Create(TimeTableModel model)
    {
        await timetableWriteService.CreateAsync(model);
    }
    
    public async Task Update(TimeTableModel model)
    {
        await timetableWriteService.UpdateAsync(model);
    }
    
    public async Task Delete(int id)
    {
        await timetableWriteService.DeleteAsync(id);
    }

    public async Task AddEntry(TimeTableEntryModel model)
    {
        await entryWriteService.CreateAsync(model);
    }

    public async Task UpdateEntry(TimeTableEntryModel model)
    {
        await entryWriteService.UpdateAsync(model);
    }
    
    public async Task DeleteEntry(int id)
    {
        await entryWriteService.DeleteAsync(id);
    }

    public async Task<IEnumerable<TimeTablePublishResponse>> Publish(int timeTableId)
    {
        if (context.TimeTables.Any(x => x.IsPublished && x.Id != timeTableId))
        {
            throw new BadRequestException("Only one timetable can be published at a time.");
        }
        
        var timeTable = await
            context.TimeTables
                .Include(x => x.Days)
                .ThenInclude(x => x.TimeTableEntries)
                .FirstOrDefaultAsync(x => x.Id == timeTableId);

        if (timeTable is null)
            throw new BadRequestException("Timetable not found");
        
        var response = new List<TimeTablePublishResponse>();
        await DetectClashingSchedules(timeTable, response);
        
        var schedules = 
            timeTable.Days.SelectMany(x => x.TimeTableEntries)
                .Select(x => new ScheduleEntryModel
                {
                    GroupId = x.GroupId,
                    SchedualedDayOfWeek = x.TimeTableDay.DayOfWeek,
                    SchedualedStartTime = x.StartTime.ToString("HH:mm"),
                    SchedualedEndTime = x.EndTime.ToString("HH:mm"),
                    StartWeek = DateTime.Now.YearWeek(),
                    Repeat = 0,
                    TimeTableEntryId = x.Id
                });
        
        foreach (var scheduleEntryModel in schedules)
        {
            await scheduleWriteService.CreateAsync(scheduleEntryModel);
        }
        
        timeTable.IsPublished = true;
        await context.SaveChangesAsync();

        return response;
    }

    private async Task DetectClashingSchedules(Data.Models.TimeTable.TimeTable timeTable, List<TimeTablePublishResponse> response)
    {
        foreach (var day in timeTable.Days)
        {
            var repeatedExistingDaySchedules =
                await context.Schedules
                    .Include(x => x.Group)
                    .Where(x => x.ScheduledDayOfWeek == day.DayOfWeek && x.StartWeek >= DateTime.Now.YearWeek() &&
                                x.Repeat == 0)
                    .ToListAsync();

            foreach (var schedule in repeatedExistingDaySchedules)
            {
                var clashes = day.TimeTableEntries.Where(x => x.TeacherId == schedule.Group.TeacherId &&
                                                              x.StartTime >= schedule.ScheduledStartTime &&
                                                              x.EndTime <= schedule.ScheduledEndTime).ToList();
                
                response.AddRange(clashes.Select(x => new TimeTablePublishResponse
                {
                    ClashingScheduleId = schedule.Id,
                    Message = "Clash with repeated schedule, consider fixing this in the schedular."
                }));
            }
        }
    }
}