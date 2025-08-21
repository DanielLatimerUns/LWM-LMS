namespace LWM.Data.Models.Person
{
    public class Person : IDbEntity
    {
        public int Id { get; set; }

        public string Forename { get; set; }

        public string Surname { get; set; }

        public string EmailAddress1 { get; set; }

        public string PhoneNo { get; set; }

        public int? PersonType { get; set; }

    }
}
