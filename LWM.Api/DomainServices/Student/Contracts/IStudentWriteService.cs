using LWM.Api.Dtos.Models;

namespace LWM.Api.DomainServices.Student.Contracts
{
    public interface IStudentWriteService
    {
        Task<Data.Models.Person.Student> CreateAsync(StudentModel student);

        Task UpdateeAsync(StudentModel student);

        Task DeleteAsync(int studentId);
    }
}