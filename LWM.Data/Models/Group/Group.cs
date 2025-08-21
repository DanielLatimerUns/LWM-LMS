using System.ComponentModel.DataAnnotations;
using LWM.Data.Models.Person;

namespace LWM.Data.Models.Group
{
    public class Group : IDbEntity
    {
        public int Id { get; set; }
        [MaxLength(500)]
        public string? Name { get; set; }
        public int CompletedLessonNo { get; set; }
        public Teacher Teacher { get; set; }
        public int TeacherId { get; set; }

        public ICollection<Student> Students { get; set; } = [];
    }
}
