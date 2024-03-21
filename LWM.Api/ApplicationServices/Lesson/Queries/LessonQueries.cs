namespace LWM.Api.ApplicationServices.Lesson.Queries
{
    using LWM.Api.ApplicationServices.Lesson.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Data.Contexts;
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public class LessonQueries(
        CoreContext context) : ILessonQueries
    {
        public async Task<IEnumerable<Lesson>> GetLessonsAsync()
        {
            return await context.Lessons.Select(
                x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }

        public async Task<IEnumerable<Lesson>> GetLessonsBySearchStringAsync(string searchString)
        {
            return await context.Lessons.Where(
                x => x.Name.Contains(searchString) ||
                searchString.Contains(x.LessonNo.ToString()))
                .Select(
                x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }
    }
}
