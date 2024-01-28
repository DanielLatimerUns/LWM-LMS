using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.PersonService.Contracts
{
    public interface IPersonCreationService
    {
        Task<int> Execute(Person person);
    }
}