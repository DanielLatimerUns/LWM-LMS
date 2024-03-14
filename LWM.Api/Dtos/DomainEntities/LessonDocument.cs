using LWM.Api.Enums;

namespace LWM.Api.Dtos.DomainEntities
{
    public class LessonDocument
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Path { get; set; }

        public int LessonId { get; set; }

        public IFormFile FormFile { get; set; }

        public DocumentStorageProvidor DocumentStorageProvidor { get; set; }
    }
}
