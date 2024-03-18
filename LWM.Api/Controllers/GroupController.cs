namespace LWM.Api.Controllers
{
    using LWM.Api.ApplicationServices.Group.Contracts;
    using LWM.Api.ApplicationServices.Student.Contracts;
    using LWM.Api.DomainServices.GroupService.Contracts;
    using LWM.Api.Dtos.DomainEntities;
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
        public async Task<IEnumerable<Group>> Get()
        {
            return await groupQueries.GetGroupsAsync();
        }

        [HttpGet("{groupId}/students")]
        public async Task<IEnumerable<Student>> GetByGroupId(int groupId)
        {
            return await studentQueries.GetStudentsByGroupIdAsync(groupId);
        }

        [HttpPost]
        public async Task<int> Create(Group group)
        {
            return await groupWriteService.CreateAsync(group);
        }

        [HttpPut]
        public async Task Update(Group group)
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
