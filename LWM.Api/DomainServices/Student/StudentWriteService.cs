using LWM.Api.DomainServices.Student.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Student;

public class StudentWriteService(CoreContext context) : IStudentWriteService
{
    private CoreContext Context { get; set; } = context;

    public async Task<Data.Models.Person.Student> CreateAsync(StudentModel student)
    {
        var model = new Data.Models.Person.Student
        {
            Person = Context.Persons.FirstOrDefault(x => x.Id == student.PersonId),
            Group = Context.Groups.FirstOrDefault(x => x.Id == student.GroupId),
            SessionPaymentAmount = student.SessionPaymentAmount,
            PaymentMethod = student.PaymentMethod
        };

        Context.Students.Add(model);

        await Context.SaveChangesAsync();
        return model;
    }

    public async Task UpdateeAsync(StudentModel student)
    {
        var model = Context.Students.FirstOrDefault(s => s.Id == student.Id);
        if (model is null)
            throw new NotFoundException("No Group Found.");

        model.Group = Context.Groups.FirstOrDefault(x => x.Id == student.GroupId);
        model.SessionPaymentAmount = student.SessionPaymentAmount;
        model.PaymentMethod = student.PaymentMethod;

        await Context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int studentId)
    {
        var model = Context.Students.FirstOrDefault(x => x.Id == studentId);
        if (model is null)
            throw new NotFoundException("No Group Found.");

        Context.Students.Remove(model);

        await Context.SaveChangesAsync();
    }
}