using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.TeacherService
{
    public class TeacherWriteService : ITeacherWriteService
    {
        private CoreContext _context { get; set; }

        public TeacherWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<Teacher> CreateAsync(Dtos.DomainEntities.Teacher teacher)
        {
            var model = new Teacher
            {
                Person = _context.Persons.FirstOrDefault(x => x.Id == teacher.PersonId)
            };

            _context.Teachers.Add(model);

            await _context.SaveChangesAsync();

            return model;
        }

        public async Task UpdateeAsync(Dtos.DomainEntities.Teacher teacher)
        {
            var model = _context.Teachers.FirstOrDefault(s => s.Id == teacher.Id);
            Validate(model);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int teacherId)
        {
            var model = _context.Teachers.FirstOrDefault(x => x.Id == teacherId);

            Validate(model);

            _context.Teachers.Remove(model);

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Teacher model)
        {
            if (model is null)
                throw new NotFoundException("No Teacher Found.");
        }
    }
}
