namespace LWM.Api.DomainServices.TeacherService.Contracts
{
    public interface ITeacherWriteService
    {
        Task<Data.Models.Teacher> CreateAsync(Dtos.Teacher teacher);
        Task UpdateeAsync(Dtos.Teacher teacher);
    }
}