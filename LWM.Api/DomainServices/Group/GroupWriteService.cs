using LWM.Api.DomainServices.Group.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Group
{
    public class GroupWriteService(CoreContext context) : IGroupWriteService
    {
        public async Task<int> CreateAsync(GroupModel group)
        {
            var model = new Data.Models.Group.Group
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

        public async Task UpdateAsync(GroupModel group)
        {
            var model = context.Groups.FirstOrDefault(x => x.Id == group.Id);

            Validate(model);

            model.Name = group.Name;
            model.CompletedLessonNo = group.ComepletedLessonNo;
            model.Teacher = context.Teachers.First(t => t.Id == group.TeacherId);

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Group.Group model)
        {
            if (model is null)
                throw new NotFoundException("No Group Found.");
        }
    }
}
