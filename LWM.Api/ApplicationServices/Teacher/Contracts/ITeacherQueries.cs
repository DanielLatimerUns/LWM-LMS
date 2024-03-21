namespace LWM.Api.ApplicationServices.Teacher.Contracts
{
    public interface ITeacherQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Teacher>> GetTeachersAsync();
    }
}