using LWM.Api.Dtos.Models;

namespace LWM.Api.Dtos.ViewModels
{
    public class LessonViewModel
    {
        public LessonModel Lesson { get; set; }

        public ScheduleEntryModel ScheduleEntry { get; set; }

        public IEnumerable<StudentModel> Students { get; set; }

        public IEnumerable<LessonDocumentModel> Documents { get; set; }

        public GroupModel Group { get; set; }
    }
}
