using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface IClashDetectionService
    {
        Task<bool> LessonSceduleHasClash(LessonSchedule lessonSchedule);
    }
}