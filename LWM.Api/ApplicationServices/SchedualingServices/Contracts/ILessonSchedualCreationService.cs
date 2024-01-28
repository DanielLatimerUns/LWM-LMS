using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface ILessonSchedualCreationService
    {
        Task<int> Execute(LessonSchedule lessonSchedule);
    }
}