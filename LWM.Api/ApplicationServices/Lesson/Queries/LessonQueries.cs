namespace LWM.Api.ApplicationServices.Lesson.Queries
{
    using Data.Contexts;
    using Microsoft.EntityFrameworkCore;

    public interface ILessonQueries
    {
        Task<IEnumerable<Dtos.Models.LessonModel>> GetLessonsAsync();
        Task<IEnumerable<Dtos.Models.LessonModel>> GetLessonsBySearchStringAsync(string searchString);
    }

    public class LessonQueries(
        CoreContext context) : ILessonQueries
    {
        public async Task<IEnumerable<Dtos.Models.LessonModel>> GetLessonsAsync()
        {
            return await context.Lessons.Select(x => new Dtos.Models.LessonModel
                { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo }).ToListAsync();
        }

        public async Task<IEnumerable<Dtos.Models.LessonModel>> GetLessonsBySearchStringAsync(string searchString)
        {
            return await context.Lessons.Where(x => x.Name.Contains(searchString) ||
                                                    searchString.Contains(x.LessonNo.ToString()))
                .Select(x => new Dtos.Models.LessonModel { Id = x.Id, Name = x.Name, LessonNo = x.LessonNo })
                .ToListAsync();
        }
    }
}
