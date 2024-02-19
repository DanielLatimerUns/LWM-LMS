using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.LessonService.Contracts
{
    public interface ILessonWriteService
    {
        Task<int> CreateAsync(Dtos.DomainEntities.Lesson lesson, AzureObjectLink? azureObjectLink = null);
        Task DeleteAsync(int lessonId);
        Task UpdateAsync(Dtos.DomainEntities.Lesson lesson);
    }
}