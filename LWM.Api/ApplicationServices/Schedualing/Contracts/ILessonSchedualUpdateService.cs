using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.Schedualing.Contracts
{
    public interface ILessonSchedualUpdateService
    {
        Task Execute(LessonSchedule lessonSchedule);
    }
}