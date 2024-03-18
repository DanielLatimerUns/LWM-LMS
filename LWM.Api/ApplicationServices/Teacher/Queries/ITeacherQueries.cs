





namespace LWM.Api.ApplicationServices.Teacher.Queries
{
    public interface ITeacherQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Teacher>> GetTeachersAsync();
    }
}