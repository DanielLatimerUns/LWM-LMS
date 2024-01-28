using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.GroupService
{
    public class GroupReadService : IGroupReadService
    {
        private CoreContext _context { get; set; }

        public GroupReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Group>> GetGroups()
        {
            var results = await _context.Groups.Include(x => x.Teacher).ToListAsync();

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
