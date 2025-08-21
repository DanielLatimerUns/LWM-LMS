namespace LWM.Api.Dtos.Models.Azure
{
    public class AzureFileEntityModel
    {
        public string FileName { get; set; }

        public IFormFile File  { get; set; }

        public string AzureObjectId { get; set; }

        public LessonModel Lesson { get; set; }
    }
}
