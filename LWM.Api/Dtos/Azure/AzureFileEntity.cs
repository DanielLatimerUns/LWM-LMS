using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.Dtos.Azure
{
    public class AzureFileEntity
    {
        public string FileName { get; set; }

        public IFormFile File  { get; set; }

        public string AzureObjectId { get; set; }

        public Lesson Lesson { get; set; }
    }
}
