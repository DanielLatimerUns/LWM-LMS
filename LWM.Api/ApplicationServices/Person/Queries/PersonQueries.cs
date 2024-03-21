namespace LWM.Api.ApplicationServices.Person.Queries
{
    using LWM.Api.ApplicationServices.Person.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Api.Enums;
    using LWM.Data.Contexts;
    using Microsoft.EntityFrameworkCore;

    public class PersonQueries(
        CoreContext context) : IPersonQueries
    {

        public async Task<IEnumerable<Person>> GetPersonsAsync()
        {
            var result = await context.Persons.ToListAsync();
            return result.Select(MapDto);
        }

        public async Task<IEnumerable<Person>> GetPersonsBySearchStringAsync(string searchString)
        {
            var result = await context.Persons.Where(
                x => x.Forename.Contains(searchString) ||
                x.Surname.Contains(searchString) ||
                x.EmailAddress1.Contains(searchString)
                ).ToListAsync();

            return result.Select(MapDto);
        }

        private static Person MapDto(Data.Models.Person model)
        {
            return new Person
            {
                Id = model.Id,
                Forename = model.Forename,
                Surname = model.Surname,
                EmailAddress1 = model.EmailAddress1,
                PhoneNo = model.PhoneNo,
                PersonType = Enum.Parse<PersonType>(model.PersonType.ToString())
            };
        }
    }
}
