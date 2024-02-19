using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.CurriculumService.Contracts
{
    public interface ICurriculumWriteService
    {
        Task<int> CreateAsync(Dtos.DomainEntities.Curriculum curriculum, AzureObjectLink? azureObjectLink = null);
        Task DeleteAsync(int curriculumId);
        Task UpdateAsync(Dtos.DomainEntities.Curriculum curriculum);
    }
}