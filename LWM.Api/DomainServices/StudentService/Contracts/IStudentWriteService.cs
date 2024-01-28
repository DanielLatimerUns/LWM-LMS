using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.StudentService.Contracts
{
    public interface IStudentWriteService
    {
        Task<Data.Models.Student> CreateAsync(Student student);

        Task UpdateeAsync(Student student);

        Task DeleteAsync(int studentId);
    }
}