namespace LWM.Api.ApplicationServices.Person.Contracts
{
    using LWM.Api.Dtos.DomainEntities;

    public interface IPersonUpdateService
    {
        Task Execute(Person person);
    }
}