using LWM.Api.Dtos;

namespace LWM.Api.ApplicationServices.Teacher.Queries
{
    using Data.Contexts;
    using Microsoft.EntityFrameworkCore;

    public interface ITeacherQueries
    {
        Task<IEnumerable<Dtos.Models.TeacherModel>> GetTeachersAsync();
    }

    public class TeacherQueries(
        CoreContext coreContext) : ITeacherQueries
    {
        public async Task<IEnumerable<Dtos.Models.TeacherModel>> GetTeachersAsync()
        {
            return await coreContext.Teachers
                .Include(x => x.Person)
                .Select(
                x => x.ToModel()).ToListAsync();
        }
    }
}
