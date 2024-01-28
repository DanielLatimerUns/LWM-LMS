using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.Dtos.ViewModels
{
    public class CurrentLessonViewModel
    {
        public Lesson Lesson { get; set; }

        public LessonSchedule LessonSchedule { get; set; }

        public IEnumerable<Student> Students { get; set; }

        public IEnumerable<LessonDocument> Documents { get; set; }

        public Group Group { get; set; }
    }
}
