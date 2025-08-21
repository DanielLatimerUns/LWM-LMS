using LWM.Api.ApplicationServices.Group.Queries;
using LWM.Api.ApplicationServices.Student.Queries;
using LWM.Api.DomainServices.Group.Contracts;
using LWM.Api.Dtos.Models;

namespace LWM.Api.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Authorize]
    [Route("group")]
    public class GroupController(
        IStudentQueries studentQueries,
        IGroupWriteService groupWriteService,
        IGroupQueries groupQueries) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<GroupModel>> Get()
        {
            return await groupQueries.GetGroupsAsync();
        }

        [HttpGet("{searchString}")]
        public async Task<IEnumerable<GroupModel>> GetWithFilter(string searchString)
        {
            return await groupQueries.GetGroupsBySearchStringAsync(searchString);
        }

        [HttpGet("{groupId}/students")]
        public async Task<IEnumerable<StudentModel>> GetByGroupId(int groupId)
        {
            return await studentQueries.GetStudentsByGroupIdAsync(groupId);
        }

        [HttpPost]
        public async Task<int> Create(GroupModel group)
        {
            return await groupWriteService.CreateAsync(group);
        }

        [HttpPut]
        public async Task Update(GroupModel group)
        {
            await groupWriteService.UpdateAsync(group);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await groupWriteService.DeleteAsync(id);
        }
    }
}
