using LWM.Api.Dtos.Models;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.Lesson.Contracts
{
    public interface ILessonWriteService
    {
        Task<int> CreateAsync(LessonModel lesson, AzureObjectLink? azureObjectLink = null);
        Task DeleteAsync(int lessonId);
        Task UpdateAsync(LessonModel lesson);
    }
}