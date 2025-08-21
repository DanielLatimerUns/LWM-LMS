using LWM.Api.ApplicationServices.Student.Queries;
using LWM.Api.Dtos.Models;
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
        public async Task<IEnumerable<StudentModel>> Get()
        {
            return await studentQueries.GetStudentsAsync();
        }
    }
}
