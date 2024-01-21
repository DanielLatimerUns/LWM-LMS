using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.Dtos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("person")]
    public class PersonController : Controller
    {

        private readonly IPersonWriteService _personWriteService;

        private readonly IPersonReadService _personReadService;

        public PersonController(
            IPersonWriteService personWriteService,
            IPersonReadService personReadService)
        {
            _personReadService = personReadService;
            _personWriteService = personWriteService;
        }

        [HttpGet]
        public async Task<IEnumerable<Person>> Get()
        {
            return await _personReadService.Get();
        }

        [HttpPost]
        public async Task<int> Create(Person person)
        {
            return await _personWriteService.CreateAsync(person);
        }

        [HttpPut]
        public async Task Update(Person person)
        {
            await _personWriteService.UpdateAsync(person);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _personWriteService.DeleteAsync(id);
        }
    }
}
