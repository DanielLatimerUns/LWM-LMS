using LWM.Api.ApplicationServices.Person.Queries;
using LWM.Api.ApplicationServices.Person.Services;
using LWM.Api.ApplicationServices.Student.Queries;
using LWM.Api.Dtos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("person")]
    public class PersonController(
        IPersonService personService,
        IPersonQueries personQueries,
        IStudentQueries studentQueries) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<PersonModel>> Get()
        {
            return await personQueries.GetPersonsAsync();
        }

        [HttpGet("{searchString}")]
        public async Task<IEnumerable<PersonModel>> GetWithFilter(string searchString)
        {
            return await personQueries.GetPersonsBySearchStringAsync(searchString);
        }

        [HttpGet("{personId}/student")]
        public async Task<IEnumerable<StudentModel>> Get(int personId)
        {
            return await studentQueries.GetStudentsByPersonIdAsync(personId);
        }

        [HttpPost]
        public async Task<int> Create(PersonModel personModel)
        {
            return await personService.Create(personModel);
        }

        [HttpPut]
        public async Task Update(PersonModel personModel)
        {
            await personService.Update(personModel);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await personService.Delete(id);
        }
    }
}
