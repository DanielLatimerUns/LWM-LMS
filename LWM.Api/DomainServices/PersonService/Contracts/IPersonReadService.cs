using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.PersonService.Contracts
{
    public interface IPersonReadService
    {
        Task<IEnumerable<Person>> Get();
    }
}