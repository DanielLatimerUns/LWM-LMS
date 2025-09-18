using LWM.Api.Dtos;

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
            var result = await 
                context.Persons
                    .Include(x => x.Student).ThenInclude(x => x.Group)
                    .Include(x => x.Teacher)
                    .OrderBy(x => x.Forename).ThenBy(x => x.Surname)
                    .ToListAsync();
            return result.Select(MapDto);
        }

        public async Task<IEnumerable<Dtos.Models.PersonModel>> GetPersonsBySearchStringAsync(string searchString)
        {
            var result = await context.Persons.Where(x => x.Forename.ToUpper().Contains(searchString.ToUpper()) ||
                                                          x.Surname.ToUpper().Contains(searchString.ToUpper()) ||
                                                          x.EmailAddress1.ToUpper().Contains(searchString.ToUpper())
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
                PersonType = Enum.Parse<PersonType>(model.PersonType.ToString() ?? string.Empty),
                Notes = model.Notes,
                Student = model.Student?.ToModel() ?? new(),
                Teacher = model.Teacher?.ToModel() ?? new()
            };
        }
    }
}
