namespace LWM.Data.Models.Lesson
{
    public class Lesson : IDbEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int LessonNo { get; set;}

        public required Curriculum.Curriculum Curriculum { get; set; }
        public int CurriculumId { get; set; }

        public AzureObjectLink? AzureObjectLink { get; set; }

        public ICollection<Document.Document> Documents { get; set; } = new List<Document.Document>();
    }
}
