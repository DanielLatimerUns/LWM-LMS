namespace LWM.Api.ApplicationServices.PersonService.Contracts
{
    public interface IPersonDeleteService
    {
        Task Execute(int personId);
    }
}