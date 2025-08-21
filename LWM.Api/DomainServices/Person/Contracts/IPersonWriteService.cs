using LWM.Api.Dtos.Models;

namespace LWM.Api.DomainServices.Person.Contracts
{
    public interface IPersonWriteService
    {
        Task<int> CreateAsync(PersonModel personModel);
        Task DeleteAsync(int personId);
        Task UpdateAsync(PersonModel personModel);
    }
}