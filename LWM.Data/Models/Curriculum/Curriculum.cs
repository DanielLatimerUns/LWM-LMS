namespace LWM.Data.Models.Curriculum
{
    public class Curriculum : IDbEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string NativeLanguage { get; set; }

        public string Targetlanguage { get; set; }

        public AzureObjectLink? AzureObjectLink { get; set; }

        public ICollection<Lesson.Lesson>? Lessons { get; set; }
    }
}
