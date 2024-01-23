using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.StudentService.Contracts
{
    public interface IStudentReadService
    {
        Task<IEnumerable<Student>> Get();

        Task<IEnumerable<Student>> GetByGroupId(int groupId);
    }
}