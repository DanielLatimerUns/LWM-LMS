using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.DomainServices.StudentService;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.PersonService
{
    public class PersonWriteService(CoreContext context) : IPersonWriteService
    {
        public async Task<int> CreateAsync(Dtos.DomainEntities.Person person)
        {
            var model = new Data.Models.Person
            {
                Forename = person.Forename,
                Surname = person.Surname,
                EmailAddress1 = person.EmailAddress1,
                PhoneNo = person.PhoneNo,
                PersonType = person.PersonType
            };

            context.Persons.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int personId)
        {
            var model = context.Persons.FirstOrDefault(x => x.Id == personId);

            Validate(model);

            context.Persons.Remove(model);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.DomainEntities.Person person)
        {
            var model = context.Persons.FirstOrDefault(x => x.Id == person.Id);

            Validate(model);

            model.Forename = person.Forename;
            model.Surname = person.Surname;
            model.EmailAddress1 = person.EmailAddress1;
            model.PhoneNo = person.PhoneNo;

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Person model)
        {
            if (model is null)
                throw new NotFoundException("No Person Found.");
        }
    }
}
