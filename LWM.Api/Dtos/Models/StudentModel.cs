namespace LWM.Api.Dtos.Models;

public class StudentModel
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? GroupId { get; set; }
    public int? PersonId { get; set; }
    public string? PaymentMethod { get; set; }
    public decimal? SessionPaymentAmount { get; set; }
}