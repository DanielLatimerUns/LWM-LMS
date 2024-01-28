using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.TeacherService.Contracts
{
    public interface ITeacherWriteService
    {
        Task<Data.Models.Teacher> CreateAsync(Teacher teacher);

        Task UpdateeAsync(Teacher teacher);

        Task DeleteAsync(int teacherId);
    }
}