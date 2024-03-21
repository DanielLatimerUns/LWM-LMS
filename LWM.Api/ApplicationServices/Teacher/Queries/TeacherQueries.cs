namespace LWM.Api.ApplicationServices.Teacher.Queries
{
    using LWM.Data.Contexts;
    using Microsoft.EntityFrameworkCore;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Api.ApplicationServices.Teacher.Contracts;

    public class TeacherQueries(
        CoreContext coreContext) : ITeacherQueries
    {
        public async Task<IEnumerable<Teacher>> GetTeachersAsync()
        {
            return await coreContext.Teachers.Select(
                x => new Teacher
                {
                    Id = x.Id,
                    Name = x.Person != null ? $"{x.Person.Forename}, {x.Person.Surname}" : "No Person Record",
                    PersonId = x.Person != null ? x.Person.Id : null,
                }).ToListAsync();
        }
    }
}
