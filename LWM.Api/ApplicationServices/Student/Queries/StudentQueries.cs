using LWM.Api.Dtos;

namespace LWM.Api.ApplicationServices.Student.Queries
{
    using Data.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public interface IStudentQueries
    {
        Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsAsync(Expression<Func<Data.Models.Person.Student, bool>> filter = null);
        Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsByGroupIdAsync(int groupId);
        Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsByPersonIdAsync(int personId);
    }

    public class StudentQueries(
        CoreContext coreContext) : IStudentQueries
    {
        public async Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsAsync(Expression<Func<Data.Models.Person.Student, bool>> filter = null)
        {
            return await coreContext.Students.Where(filter)
                .Include(s => s.Person)
                .Include(s => s.Group).Select(x => x.ToModel()).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsByGroupIdAsync(int groupId)
        {
            return await coreContext.Students
                .Include(s => s.Person)
                .Include(s => s.Group)
                .Where(s => s.Group != null && s.Group.Id == groupId)
                .Select(x => x.ToModel()).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.Models.StudentModel>> GetStudentsByPersonIdAsync(int personId)
        {
            return await coreContext.Students
                .Include(s => s.Person)
                .Include(s => s.Group)
                .Where(s => s.Person != null && s.Person.Id == personId)
                .Select(x => x.ToModel()).ToListAsync();
        }
    }
}
