using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.GroupService.Contracts
{
    public interface IGroupReadService
    {
        Task<IEnumerable<Group>> GetGroups();
    }
}