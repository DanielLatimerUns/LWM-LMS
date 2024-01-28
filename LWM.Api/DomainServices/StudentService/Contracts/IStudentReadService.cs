using LWM.Api.Dtos.DomainEntities;
using System.Linq.Expressions;

namespace LWM.Api.DomainServices.StudentService.Contracts
{
    public interface IStudentReadService
    {
        Task<IEnumerable<Student>> Get(Expression<Func<LWM.Data.Models.Student, bool>> filter = null);

        Task<IEnumerable<Student>> GetByGroupId(int groupId);
    }
}