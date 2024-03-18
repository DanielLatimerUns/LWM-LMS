using LWM.Api.ApplicationServices.Person.Contracts;
using LWM.Api.ApplicationServices.Student.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("person")]
    public class PersonController(
        IPersonUpdateService personUpdateService,
        IPersonCreationService personCreationService,
        IPersonQueries personQueries,
        IPersonDeleteService personDeleteService,
        IStudentQueries studentQueries) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<Person>> Get()
        {
            return await personQueries.GetPersonsAsync();
        }

        [HttpGet("{personId}/student")]
        public async Task<IEnumerable<Student>> Get(int personId)
        {
            return await studentQueries.GetStudentsByPersonIdAsync(personId);
        }

        [HttpPost]
        public async Task<int> Create(Person person)
        {
            return await personCreationService.Execute(person);
        }

        [HttpPut]
        public async Task Update(Person person)
        {
            await personUpdateService.Execute(person);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await personDeleteService.Execute(id);
        }
    }
}
