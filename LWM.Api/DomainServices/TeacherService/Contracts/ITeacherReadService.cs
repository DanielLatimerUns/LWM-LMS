using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.TeacherService.Contracts
{
    public interface ITeacherReadService
    {
        Task<IEnumerable<Teacher>> Get();
    }
}