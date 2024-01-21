using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.PersonService.Contracts
{
    public interface IPersonWriteService
    {
        Task<int> CreateAsync(Person person);
        Task DeleteAsync(int personId);
        Task UpdateAsync(Person person);
    }
}