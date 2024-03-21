namespace LWM.Api.ApplicationServices.Group.Contracts
{
    public interface IGroupQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Group>> GetGroupsAsync();

        Task<IEnumerable<Dtos.DomainEntities.Group>> GetGroupsBySearchStringAsync(string seachString);
    }
}