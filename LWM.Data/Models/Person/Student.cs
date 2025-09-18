namespace LWM.Data.Models.Person
{
    public class Student : IDbEntity
    {
        public int Id { get; set; }
        public Person? Person { get; set; }
        public int? PersonId { get; set; }
        public Group.Group? Group { get; set; }
        public string? PaymentMethod { get; set; }
        public decimal? SessionPaymentAmount { get; set; }
    }
}
