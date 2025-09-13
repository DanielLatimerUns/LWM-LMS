namespace LWM.Api.ApplicationServices.Group.Queries
{
    using Microsoft.EntityFrameworkCore;
    using Data.Contexts;

    public interface IGroupQueries
    {
        Task<IEnumerable<Dtos.Models.GroupModel>> GetGroupsAsync();
        Task<IEnumerable<Dtos.Models.GroupModel>> GetGroupsBySearchStringAsync(string searchString);
    }

    public class GroupQueries(CoreContext coreContext) : IGroupQueries
    {
        public async Task<IEnumerable<Dtos.Models.GroupModel>> GetGroupsAsync()
        {
            var results = await coreContext.Groups.Include(x => x.Teacher).ToListAsync();

            return results.Select(MapModel);
        }

        public async Task<IEnumerable<Dtos.Models.GroupModel>> GetGroupsBySearchStringAsync(string seachString)
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

        private Dtos.Models.GroupModel MapModel(Data.Models.Group.Group model)
        {
            return new Dtos.Models.GroupModel
            {
                Id = model.Id,
                Name = model.Name,
                TeacherId = model.Teacher.Id,
                ComepletedLessonNo = model.CompletedLessonNo
            };
        }
    }
}
