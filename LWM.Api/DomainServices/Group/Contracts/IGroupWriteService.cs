using LWM.Api.Dtos.Models;

namespace LWM.Api.DomainServices.Group.Contracts
{
    public interface IGroupWriteService
    {
        Task<int> CreateAsync(GroupModel group);
        Task DeleteAsync(int groupId);
        Task UpdateAsync(GroupModel group);
    }
}