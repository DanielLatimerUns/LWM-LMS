using LWM.Api.ApplicationServices.TimeTable;
using LWM.Api.ApplicationServices.TimeTable.Queries;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers;

[ApiController]
[Authorize]
[Route("timetable")]
public class TimeTableController(ITimeTableService timeTableService, ITimeTableQueries timeTableQueries) : Controller
{
    [HttpGet]
    public async Task<IEnumerable<TimeTableModel>> Get()
    {
        return await timeTableQueries.GetTimeTablesAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<TimeTableModel> Get(int id)
    {
        return await timeTableQueries.GetTimeTableByIdAsync(id);
    }
    
    [HttpPost]
    public async Task Create(TimeTableModel timeTable)
    {
        await timeTableService.Create(timeTable);
    }

    [HttpPut]
    public async Task Update(TimeTableModel timeTable)
    {
        await timeTableService.Update(timeTable);
    }
    
    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
        await timeTableService.Delete(id);
    }

    [HttpPost("publish")]
    public async Task<IEnumerable<TimeTablePublishResponse>> Publish(int timeTableId)
    {
        return await timeTableService.Publish(timeTableId);
    }

    [HttpPost("entry")]
    public async Task AddEntry(TimeTableEntryModel model)
    {
        await timeTableService.AddEntry(model);
    }

    [HttpPut("entry")]
    public async Task UpdateEntry(TimeTableEntryModel model)
    {
        await timeTableService.UpdateEntry(model);
    }
    
    [HttpDelete("entry/{id}")]
    public async Task DeleteEntry(int id)
    {
        await timeTableService.DeleteEntry(id);   
    }
}