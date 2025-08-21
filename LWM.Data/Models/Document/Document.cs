using System.ComponentModel.DataAnnotations;

namespace LWM.Data.Models.Document
{
    public class Document : IDbEntity
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public required string Name { get; set; }

        [MaxLength(500)]
        public required string DocumentPath { get; set; }

        public AzureObjectLink? AzureObjectLink { get; set; }

        public Lesson.Lesson? Lesson { get; set; }
    } 
}
