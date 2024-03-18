using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.Schedualing.Contracts
{
    public interface IClashDetectionService
    {
        LessonSchedule FindClash(LessonSchedule lessonSchedule);
    }
}