namespace LWM.Api.ApplicationServices.Person.Contracts
{
    public interface IPersonDeleteService
    {
        Task Execute(int personId);
    }
}