using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.GroupService
{
    public class GroupWriteService : IGroupWriteService
    {
        private CoreContext _context;

        public GroupWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Dtos.Group group)
        {
            var model = new Data.Models.Group
            {
                Name = group.Name,
                Teacher = _context.Teachers.First(t => t.Id == group.TeacherId),
            };

            _context.Groups.Add(model);

            await _context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int groupId)
        {
            var model = _context.Groups.FirstOrDefault(x => x.Id == groupId);

            Validate(model);

            _context.Groups.Remove(model);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Dtos.Group group)
        {
            var model = _context.Groups.FirstOrDefault(x => x.Id == group.Id);

            Validate(model);

            model.Name = group.Name;
            model.CompletedLessonNo = group.ComepletedLessonNo;
            model.Teacher = _context.Teachers.First(t => t.Id == group.TeacherId);

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Group model)
        {
            if (model is null)
                throw new NotFoundException("No Group Found.");
        }
    }
}
