using System.Linq.Expressions;

namespace LWM.Api.ApplicationServices.Student.Contracts
{
    public interface IStudentQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsAsync(Expression<Func<Data.Models.Student, bool>> filter = null);
        Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsByGroupIdAsync(int groupId);

        Task<IEnumerable<Dtos.DomainEntities.Student>> GetStudentsByPersonIdAsync(int personId);
    }
}