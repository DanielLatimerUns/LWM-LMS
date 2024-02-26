
using LWM.Api.DomainServices.CurriculumService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.CurriculumService
{
    public class CurriculumWriteService(CoreContext context) : ICurriculumWriteService
    {

        public async Task<int> CreateAsync(
            Dtos.DomainEntities.Curriculum curriculum,
            AzureObjectLink? azureObjectLink = null)
        {
            var model = new Data.Models.Curriculum
            {
                Name = curriculum.Name,
                Targetlanguage = curriculum.Targetlanguage,
                NativeLanguage = curriculum.NativeLanguage,
                AzureObjectLink = azureObjectLink
            };

            context.LessonCurriculums.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int curriculumId)
        {
            var model = context.LessonCurriculums.FirstOrDefault(x => x.Id == curriculumId);

            Validate(model);

            context.LessonCurriculums.Remove(model);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.DomainEntities.Curriculum curriculum)
        {
            var model = context.LessonCurriculums.FirstOrDefault(x => x.Id == curriculum.Id);

            Validate(model);

            model.Name = curriculum.Name;
            model.Targetlanguage = curriculum.Targetlanguage;
            model.NativeLanguage = curriculum.NativeLanguage;

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Curriculum model)
        {
            if (model is null)
                throw new NotFoundException("No Document Found.");
        }
    }
}
