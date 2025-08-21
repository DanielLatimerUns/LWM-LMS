using LWM.Api.DomainServices.Teacher.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Teacher
{
    public class TeacherWriteService : ITeacherWriteService
    {
        private CoreContext _context { get; set; }

        public TeacherWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<Data.Models.Person.Teacher> CreateAsync(Dtos.Models.TeacherModel teacher)
        {
            var model = new Data.Models.Person.Teacher
            {
                Person = _context.Persons.FirstOrDefault(x => x.Id == teacher.PersonId)
            };

            _context.Teachers.Add(model);

            await _context.SaveChangesAsync();

            return model;
        }

        public async Task UpdateAsync(Dtos.Models.TeacherModel teacher)
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

        private void Validate(Data.Models.Person.Teacher model)
        {
            if (model is null)
                throw new NotFoundException("No Teacher Found.");
        }
    }
}
