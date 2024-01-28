using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.TeacherService
{
    public class TeacherReadService : ITeacherReadService
    {
        private CoreContext _context { get; set; }

        public TeacherReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Teacher>> Get()
        {
            return await _context.Teachers.Select(
                x => new Teacher
                {
                    Id = x.Id,
                    Name = x.Person != null ? $"{x.Person.Forename}, {x.Person.Surname}" : "No Person Record",
                    PersonId = x.Person != null ? x.Person.Id : null,
                }).ToListAsync();
        }
    }
}
