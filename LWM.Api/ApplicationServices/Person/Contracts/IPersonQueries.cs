namespace LWM.Api.ApplicationServices.Person.Contracts
{
    using LWM.Api.Dtos.DomainEntities;

    public interface IPersonQueries
    {
        Task<IEnumerable<Person>> GetPersonsAsync();
    }
}