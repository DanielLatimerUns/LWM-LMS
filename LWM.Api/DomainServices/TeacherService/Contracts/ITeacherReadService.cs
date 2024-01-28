using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.TeacherService.Contracts
{
    public interface ITeacherReadService
    {
        Task<IEnumerable<Teacher>> Get();
    }
}