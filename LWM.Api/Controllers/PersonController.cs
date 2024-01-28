using LWM.Api.ApplicationServices.PersonService.Contracts;
using LWM.Api.ApplicationServices.PersonServices.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("person")]
    public class PersonController(
        IPersonUpdateService personUpdateService,
        IPersonCreationService personCreationService,
        IPersonQueries personQueries,
        IPersonDeleteService personDeleteService) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<Person>> Get()
        {
            return await personQueries.Get();
        }

        [HttpGet("{personId}/student")]
        public async Task<IEnumerable<Student>> Get(int personId)
        {
            return await personQueries.GetStudentForPerson(personId);
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
