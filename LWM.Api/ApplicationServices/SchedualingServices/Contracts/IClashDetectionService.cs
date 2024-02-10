using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface IClashDetectionService
    {
        LessonSchedule FindClash(LessonSchedule lessonSchedule);
    }
}