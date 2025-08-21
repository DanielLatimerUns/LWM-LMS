namespace LWM.Data.Models
{
    public class AzureObjectLink : IDbEntity
    {
        public int Id { get; set; }

        public string AzureId { get; set; }
    }
}
