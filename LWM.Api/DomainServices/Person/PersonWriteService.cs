using LWM.Api.DomainServices.Person.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Person;

public class PersonWriteService(CoreContext context) : IPersonWriteService
{
    public async Task<int> CreateAsync(PersonModel personModel)
    {
        var model = new Data.Models.Person.Person
        {
            Forename = personModel.Forename ?? string.Empty,
            Surname = personModel.Surname ?? string.Empty,
            EmailAddress1 = personModel.EmailAddress1 ?? string.Empty,
            PhoneNo = personModel.PhoneNo ?? string.Empty,
            PersonType = (int)personModel.PersonType,
            Notes = personModel.Notes,
        };

        context.Persons.Add(model);

        await context.SaveChangesAsync();
        return model.Id;
    }

    public async Task DeleteAsync(int personId)
    {
        var model = context.Persons.FirstOrDefault(x => x.Id == personId);
        if (model is null)
            throw new NotFoundException("No Person Found.");

        context.Persons.Remove(model);

        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(PersonModel personModel)
    {
        var model = context.Persons.FirstOrDefault(x => x.Id == personModel.Id);
        if (model is null)
            throw new NotFoundException("No Person Found.");

        model.Forename = personModel.Forename ?? string.Empty;
        model.Surname = personModel.Surname ?? string.Empty;
        model.EmailAddress1 = personModel.EmailAddress1 ?? string.Empty;
        model.PhoneNo = personModel.PhoneNo ?? string.Empty;
        model.PersonType = (int)personModel.PersonType;
        model.Notes = personModel.Notes;

        await context.SaveChangesAsync();
    }
}