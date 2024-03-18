using LWM.Api.ApplicationServices.Student.Contracts;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("student")]
    public class StudentController(
        IStudentQueries studentQueries) : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            return await studentQueries.GetStudentsAsync();
        }
    }
}
