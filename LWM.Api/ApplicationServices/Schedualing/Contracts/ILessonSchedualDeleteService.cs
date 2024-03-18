namespace LWM.Api.ApplicationServices.Schedualing.Contracts
{
    public interface ILessonSchedualDeleteService
    {
        Task Execute(int lessonScheduleId);
    }
}