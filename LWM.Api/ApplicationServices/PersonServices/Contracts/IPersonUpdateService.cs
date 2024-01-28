using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.PersonService.Contracts
{
    public interface IPersonUpdateService
    {
        Task Execute(Person person);
    }
}