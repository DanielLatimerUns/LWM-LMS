using LWM.Api.Dtos.Models;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.Curriculum.Contracts
{
    public interface ICurriculumWriteService
    {
        Task<int> CreateAsync(CurriculumModel curriculum, AzureObjectLink? azureObjectLink = null);
        Task DeleteAsync(int curriculumId);
        Task UpdateAsync(CurriculumModel curriculum);
    }
}