using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.GroupService.Contracts
{
    public interface IGroupReadService
    {
        Task<IEnumerable<Group>> GetGroups();
    }
}