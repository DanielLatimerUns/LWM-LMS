using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Enums;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.PersonService
{
    public class PersonReadService : IPersonReadService
    {
        private CoreContext _context { get; set; }

        public PersonReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Person>> Get()
        {
            return await _context.Persons.Select(
                x => new Person
                {
                    Id = x.Id,
                    Forename = x.Forename,
                    Surname = x.Surname,
                    EmailAddress1 = x.EmailAddress1,
                    PhoneNo = x.PhoneNo,
                    PersonType = Enum.Parse<PersonType>(x.PersonType.ToString()),
                }).ToListAsync();
        }
    }
}
