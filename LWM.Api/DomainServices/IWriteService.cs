namespace LWM.Api.DomainServices;

public interface IWriteService<in T>
{
    Task CreateAsync(T model);
    Task UpdateAsync(T model);
    Task DeleteAsync(int id);
}