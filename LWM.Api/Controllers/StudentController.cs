using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("student")]
    public class StudentController : Controller
    {
        private IStudentReadService _studentReadService;

        public StudentController(IStudentReadService studentReadService)
        {
            _studentReadService = studentReadService;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            return await _studentReadService.Get();
        }
    }
}
