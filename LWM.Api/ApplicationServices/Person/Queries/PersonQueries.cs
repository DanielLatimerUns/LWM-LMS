namespace LWM.Api.ApplicationServices.Person.Queries
{
    using Enums;
    using Data.Contexts;
    using Microsoft.EntityFrameworkCore;

    public interface IPersonQueries
    {
        Task<IEnumerable<Dtos.Models.PersonModel>> GetPersonsAsync();
        Task<IEnumerable<Dtos.Models.PersonModel>> GetPersonsBySearchStringAsync(string searchString);
    }

    public class PersonQueries(
        CoreContext context) : IPersonQueries
    {

        public async Task<IEnumerable<Dtos.Models.PersonModel>> GetPersonsAsync()
        {
            var result = await context.Persons.ToListAsync();
            return result.Select(MapDto);
        }

        public async Task<IEnumerable<Dtos.Models.PersonModel>> GetPersonsBySearchStringAsync(string searchString)
        {
            var result = await context.Persons.Where(
                x => x.Forename.Contains(searchString) ||
                x.Surname.Contains(searchString) ||
                x.EmailAddress1.Contains(searchString)
                ).ToListAsync();

            return result.Select(MapDto);
        }

        private static Dtos.Models.PersonModel MapDto(Data.Models.Person.Person model)
        {
            return new Dtos.Models.PersonModel
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
