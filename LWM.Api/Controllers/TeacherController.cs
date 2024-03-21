using LWM.Api.ApplicationServices.Teacher.Contracts;
using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("teacher")]
    public class TeacherController(
        ITeacherQueries teacherQueries) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<Teacher>> Get()
        {
            return await teacherQueries.GetTeachersAsync();
        }
    }
}
