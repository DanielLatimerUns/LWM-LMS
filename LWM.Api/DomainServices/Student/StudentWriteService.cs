using LWM.Api.DomainServices.Student.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.DomainServices.Student
{
    public class StudentWriteService : IStudentWriteService
    {
        private CoreContext _context { get; set; }

        public StudentWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<Data.Models.Person.Student> CreateAsync(StudentModel student)
        {
            var model = new Data.Models.Person.Student
            {
                Person = _context.Persons.FirstOrDefault(x => x.Id == student.PersonId),
                Group = _context.Groups.FirstOrDefault(x => x.Id == student.GroupId)
            };

            _context.Students.Add(model);

            await _context.SaveChangesAsync();

            return model;
        }

        public async Task UpdateeAsync(StudentModel student)
        {
            var model = _context.Students.FirstOrDefault(s => s.Id == student.Id);
            Validate(model);

            model.Group = _context.Groups.FirstOrDefault(x => x.Id == student.GroupId);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int studentId)
        {
            var model = _context.Students.FirstOrDefault(x => x.Id == studentId);

            Validate(model);

            _context.Students.Remove(model);

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Person.Student model)
        {
            if (model is null)
                throw new NotFoundException("No Group Found.");
        }
    }
}
