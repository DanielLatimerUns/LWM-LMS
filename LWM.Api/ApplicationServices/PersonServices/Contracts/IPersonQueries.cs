using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.PersonServices.Contracts
{
    public interface IPersonQueries
    {
        Task<IEnumerable<Person>> Get();
        Task<IEnumerable<Student>> GetStudentForPerson(int personId);
    }
}