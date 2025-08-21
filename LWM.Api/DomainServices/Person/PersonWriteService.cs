using LWM.Api.DomainServices.Person.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Person
{
    public class PersonWriteService(CoreContext context) : IPersonWriteService
    {
        public async Task<int> CreateAsync(PersonModel personModel)
        {
            var model = new Data.Models.Person.Person
            {
                Forename = personModel.Forename,
                Surname = personModel.Surname,
                EmailAddress1 = personModel.EmailAddress1,
                PhoneNo = personModel.PhoneNo,
                PersonType = ((int)personModel.PersonType)
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

        public async Task UpdateAsync(PersonModel personModel)
        {
            var model = context.Persons.FirstOrDefault(x => x.Id == personModel.Id);

            Validate(model);

            model.Forename = personModel.Forename;
            model.Surname = personModel.Surname;
            model.EmailAddress1 = personModel.EmailAddress1;
            model.PhoneNo = personModel.PhoneNo;
            model.PersonType = ((int)personModel.PersonType);

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Person.Person model)
        {
            if (model is null)
                throw new NotFoundException("No Person Found.");
        }
    }
}
