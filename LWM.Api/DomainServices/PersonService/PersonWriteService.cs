using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.Dtos;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.PersonService
{
    public class PersonWriteService : IPersonWriteService
    {
        private CoreContext _context { get; set; }

        public PersonWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Dtos.Person person)
        {
            var model = new Data.Models.Person
            {
                Forename = person.Forename,
                Surname = person.Surname,
                EmailAddress1 = person.EmailAddress1,
                PhoneNo = person.PhoneNo,
            };

            _context.Persons.Add(model);

            await _context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int personId)
        {
            var model = _context.Persons.FirstOrDefault(x => x.Id == personId);

            Validate(model);

            _context.Persons.Remove(model);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.Person person)
        {
            var model = _context.Persons.FirstOrDefault(x => x.Id == person.Id);

            Validate(model);

            model.Forename = person.Forename;
            model.Surname = person.Surname;
            model.EmailAddress1 = person.EmailAddress1;
            model.PhoneNo = person.PhoneNo;

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Person model)
        {
            if (model is null)
                throw new NotFoundException("No Person Found.");
        }
    }
}
