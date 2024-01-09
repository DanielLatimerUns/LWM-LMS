using LWM.Api.Dtos;
using LWM.Api.Framework.Exceptions;
using LWM.Api.LessonService.Contracts;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.LessonService
{
    public class LessonWriteService : ILessonWriteService
    {
        private CoreContext _context { get; set; }

        public LessonWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Dtos.Lesson lesson)
        {
            var model = new Data.Models.Lesson
            {
                Name = lesson.Name
            };

            _context.Lessons.Add(model);

            await _context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int lessonId)
        {
            var exisintLesson = _context.Lessons.FirstOrDefault(x => x.Id == lessonId);

            this.Validate(exisintLesson);

            _context.Lessons.Remove(exisintLesson);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.Lesson lesson)
        {
            var exisintLesson = _context.Lessons.FirstOrDefault(x => x.Id == lesson.Id);

            this.Validate(exisintLesson);

            exisintLesson.Name = lesson.Name;

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Lesson lesson)
        {
            if (lesson is null)
                throw new NotFoundException("No Lesson Found.");
        }
    }
}
