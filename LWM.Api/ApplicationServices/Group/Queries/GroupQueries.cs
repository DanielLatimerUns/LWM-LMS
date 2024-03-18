namespace LWM.Api.ApplicationServices.Group.Queries
{
    using Microsoft.EntityFrameworkCore;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Data.Contexts;
    using LWM.Api.ApplicationServices.Group.Contracts;

    public class GroupQueries(
        CoreContext coreContext) : IGroupQueries
    {
        public async Task<IEnumerable<Group>> GetGroupsAsync()
        {
            var results = await coreContext.Groups.Include(x => x.Teacher).ToListAsync();

            return results.Select(g => new Group
            {
                Id = g.Id,
                Name = g.Name,
                TeacherId = g.Teacher.Id,
                ComepletedLessonNo = g.CompletedLessonNo
            });
        }
    }
}
