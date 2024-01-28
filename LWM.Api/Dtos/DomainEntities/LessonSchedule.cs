namespace LWM.Api.Dtos.DomainEntities
{
    public class LessonSchedule
    {
        public int Id { get; set; }

        public int? SchedualedDayOfWeek { get; set; }

        public string? SchedualedStartTime { get; set; }

        public string SchedualedEndTime { get; set; }

        public int? GroupId { get; set; }
    }
}
