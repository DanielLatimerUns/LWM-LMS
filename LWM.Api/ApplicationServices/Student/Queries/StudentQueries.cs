namespace LWM.Api.ApplicationServices.Student.Queries
{
    using LWM.Api.ApplicationServices.Student.Contracts;
    using LWM.Data.Contexts;
    using LWM.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public class StudentQueries(
        CoreContext coreContext) : IStudentQueries
    {
        public async Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsAsync(Expression<Func<Student, bool>> filter = null)
        {
            return await coreContext.Students.Where(filter)
                .Include(s => s.Person)
                .Include(s => s.Group).Select(x => MapDto(x)).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsByGroupIdAsync(int groupId)
        {
            return await coreContext.Students
                .Include(s => s.Person)
                .Include(s => s.Group)
                .Where(s => s.Group != null && s.Group.Id == groupId)
                .Select(x => MapDto(x)).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsByPersonIdAsync(int personId)
        {
            return await coreContext.Students
                .Include(s => s.Person)
                .Include(s => s.Group)
                .Where(s => s.Person != null && s.Person.Id == personId)
                .Select(x => MapDto(x)).ToListAsync();
        }

        private static Dtos.DomainEntities.Student MapDto(Student student)
        {
            return new Dtos.DomainEntities.Student
            {
                Id = student.Id,
                Name = student.Person != null ? $"{student.Person.Forename}, {student.Person.Surname}" : "No Person Record",
                PersonId = student.Person != null ? student.Person.Id : null,
                GroupId = student.Group != null ? student.Group.Id : null
            };
        }
    }
}
