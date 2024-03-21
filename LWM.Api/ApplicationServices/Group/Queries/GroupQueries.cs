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

            return results.Select(MapModel);
        }

        public async Task<IEnumerable<Group>> GetGroupsBySearchStringAsync(string seachString)
        {
            var results = 
                await coreContext
                .Groups
                .Include(x => x.Teacher)
                .Where(
                    x => x.Name.Contains(seachString) || 
                    (x.Students != null && 
                        x.Students.Any(s => s.Person != null && (s.Person.Forename.Contains(seachString) || s.Person.Surname.Contains(seachString)))))
                .ToListAsync();

            return results.Select(MapModel);
        }

        private Group MapModel(Data.Models.Group model)
        {
            return new Group
            {
                Id = model.Id,
                Name = model.Name,
                TeacherId = model.Teacher.Id,
                ComepletedLessonNo = model.CompletedLessonNo
            };
        }
    }
}
