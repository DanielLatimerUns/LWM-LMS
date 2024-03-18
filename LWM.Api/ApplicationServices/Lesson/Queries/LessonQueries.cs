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
        public async Task<IEnumerable<Lesson>> GetLessonsAsync(Expression<Func<LWM.Data.Models.Lesson, bool>> filter = null)
        {
            if (filter == null)
                return await context.Lessons.Select(x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();

            return await context.Lessons.Where(filter).Select(
                x => new Lesson { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }
    }
}
