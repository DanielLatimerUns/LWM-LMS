using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LWM.Api.DomainServices.StudentService
{
    public class StudentReadService : IStudentReadService
    {
        private CoreContext _context { get; set; }

        public StudentReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Dtos.DomainEntities.Student>> Get(Expression<Func<LWM.Data.Models.Student, bool>> filter = null)
        {
            return await _context.Students.Where(filter)
                .Include(s => s.Person)
                .Include(s => s.Group).Select(x => new Dtos.DomainEntities.Student
                {
                        Id = x.Id,
                        Name = x.Person != null ? $"{x.Person.Forename}, {x.Person.Surname}" : "No Person Record",
                        PersonId = x.Person != null ? x.Person.Id : null,
                        GroupId = x.Group != null ? x.Group.Id : null
                    }).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.DomainEntities.Student>> GetByGroupId(int groupId)
        {
            return await _context.Students
                .Include(s => s.Person)
                .Include(s => s.Group)
                .Where(s => s.Group != null && s.Group.Id == groupId)
                .Select(x => new Dtos.DomainEntities.Student
                {
                        Id = x.Id,
                        Name = x.Person != null ? $"{x.Person.Forename}, {x.Person.Surname}" : "No Person Record",
                        PersonId = x.Person != null ? x.Person.Id : null,
                        GroupId = x.Group != null ? x.Group.Id : null
                    }).ToListAsync();
        }
    }
}
