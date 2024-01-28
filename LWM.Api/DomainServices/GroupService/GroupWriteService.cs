using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.GroupService
{
    public class GroupWriteService(CoreContext context) : IGroupWriteService
    {
        public async Task<int> CreateAsync(Group group)
        {
            var model = new Data.Models.Group
            {
                Name = group.Name,
                Teacher = context.Teachers.First(t => t.Id == group.TeacherId),
            };

            context.Groups.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int groupId)
        {
            var model = context.Groups.FirstOrDefault(x => x.Id == groupId);

            Validate(model);

            context.Groups.Remove(model);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Group group)
        {
            var model = context.Groups.FirstOrDefault(x => x.Id == group.Id);

            Validate(model);

            model.Name = group.Name;
            model.CompletedLessonNo = group.ComepletedLessonNo;
            model.Teacher = context.Teachers.First(t => t.Id == group.TeacherId);

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Group model)
        {
            if (model is null)
                throw new NotFoundException("No Group Found.");
        }
    }
}
