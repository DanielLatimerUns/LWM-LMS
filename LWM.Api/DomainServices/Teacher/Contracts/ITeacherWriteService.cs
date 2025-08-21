using LWM.Api.Dtos.Models;

namespace LWM.Api.DomainServices.Teacher.Contracts
{
    public interface ITeacherWriteService
    {
        Task<Data.Models.Person.Teacher> CreateAsync(TeacherModel teacher);

        Task UpdateAsync(TeacherModel teacher);

        Task DeleteAsync(int teacherId);
    }
}