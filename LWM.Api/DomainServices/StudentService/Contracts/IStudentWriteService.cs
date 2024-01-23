namespace LWM.Api.DomainServices.StudentService.Contracts
{
    public interface IStudentWriteService
    {
        Task<Data.Models.Student> CreateAsync(Dtos.Student student);

        Task UpdateeAsync(Dtos.Student student);
    }
}