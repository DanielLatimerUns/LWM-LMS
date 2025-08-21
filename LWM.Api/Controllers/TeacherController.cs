using LWM.Api.ApplicationServices.Teacher.Queries;
using LWM.Api.Dtos.Models;
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
        public async Task<IEnumerable<TeacherModel>> Get()
        {
            return await teacherQueries.GetTeachersAsync();
        }
    }
}
