namespace LWM.Api.ApplicationServices.Person.Contracts
{
    using LWM.Api.Dtos.DomainEntities;

    public interface IPersonCreationService
    {
        Task<int> Execute(Person person);
    }
}