using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("group")]
    public class GroupController : Controller
    {
        private IGroupReadService _groupReadService;

        private IGroupWriteService _groupWriteService;

        private IStudentReadService _studentReadService;

        public GroupController(
            IGroupWriteService groupWriteService,
            IGroupReadService groupReadService,
            IStudentReadService studentReadService)
        {
            _groupReadService = groupReadService;
            _groupWriteService = groupWriteService;
            _studentReadService = studentReadService;
        }

        [HttpGet]
        public async Task<IEnumerable<Group>> Get()
        {
            return await _groupReadService.GetGroups();
        }

        [HttpGet("{groupId}/students")]
        public async Task<IEnumerable<Student>> GetByGroupId(int groupId)
        {
            return await _studentReadService.GetByGroupId(groupId);
        }

        [HttpPost]
        public async Task<int> Create(Group group)
        {
            return await _groupWriteService.CreateAsync(group);
        }

        [HttpPut]
        public async Task Update(Group group)
        {
            await _groupWriteService.UpdateAsync(group);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _groupWriteService.DeleteAsync(id);
        }
    }
}
