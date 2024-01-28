using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.PersonService.Contracts
{
    public interface IPersonReadService
    {
        Task<IEnumerable<Person>> Get();
    }
}