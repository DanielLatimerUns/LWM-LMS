namespace LWM.Api.Dtos.Azure
{
    public class AzureFileEntity
    {
        public string FileName { get; set; }

        public char[] FileStream  { get; set; }

        public string AzureObjectId { get; set; }
    }
}
