using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.Schedualing.Contracts
{
    public interface ILessonSchedualCreationService
    {
        Task<int> Execute(LessonSchedule lessonSchedule);
    }
}