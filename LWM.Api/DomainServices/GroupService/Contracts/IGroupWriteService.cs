using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.GroupService.Contracts
{
    public interface IGroupWriteService
    {
        Task<int> CreateAsync(Group group);
        Task DeleteAsync(int groupId);
        Task UpdateAsync(Group group);
    }
}