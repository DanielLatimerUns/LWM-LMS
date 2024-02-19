using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.LessonService
{
    public class LessonWriteService : ILessonWriteService
    {
        private CoreContext _context;

        public LessonWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Dtos.DomainEntities.Lesson lesson, AzureObjectLink? azureObjectLink = null)
        {
            var curricullum = _context.LessonCurriculums.FirstOrDefault(x => x.Id == lesson.CurriculumId);

            if (curricullum == null)
            {
                throw new NotFoundException("Curriculum not found.");
            }

            var model = new Data.Models.Lesson
            {
                Name = lesson.Name,
                LessonNo = lesson.LessonNo,
                Curriculum = curricullum,
                AzureObjectLink = azureObjectLink
            };

            _context.Lessons.Add(model);

            await _context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int lessonId)
        {
            var exisintLesson = _context.Lessons.FirstOrDefault(x => x.Id == lessonId);

            Validate(exisintLesson);

            _context.Lessons.Remove(exisintLesson);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.DomainEntities.Lesson lesson)
        {
            var exisintLesson = _context.Lessons.FirstOrDefault(x => x.Id == lesson.Id);

            Validate(exisintLesson);

            exisintLesson.Name = lesson.Name;
            exisintLesson.LessonNo = lesson.LessonNo;

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Lesson lesson)
        {
            if (lesson is null)
                throw new NotFoundException("No Lesson Found.");
        }
    }
}
