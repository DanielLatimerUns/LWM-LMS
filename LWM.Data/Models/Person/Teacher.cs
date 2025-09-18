namespace LWM.Data.Models.Person
{
    public class Teacher : IDbEntity
    {
        public int Id { get; set; }

        public Person? Person { get; set; }
        public int? PersonId { get; set; }
    }
}
