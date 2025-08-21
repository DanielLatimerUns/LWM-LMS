namespace LWM.Api.Dtos.Models.Azure
{
    public class AzureLessonImportEntity
    {
        public string Name {  get; set; }

        public AzureLessonImportEntityType EntityType { get; set; }

        public List<AzureLessonImportEntity> Children { get; set; } = new List<AzureLessonImportEntity>();

        public object AzureID { get; set; }

        public string FilePath { get; set; }
    }
}
