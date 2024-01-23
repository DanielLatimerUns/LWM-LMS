using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.StudentService
{
    public class StudentWriteService : IStudentWriteService
    {
        private CoreContext _context { get; set; }

        public StudentWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<Student> CreateAsync(Dtos.Student student)
        {
            var model = new Student
            {
                Person = _context.Persons.FirstOrDefault(x => x.Id == student.PersonId),
                Group = _context.Groups.FirstOrDefault(x => x.Id == student.GroupId)
            };

            _context.Students.Add(model);

            await _context.SaveChangesAsync();

            return model;
        }

        public async Task UpdateeAsync(Dtos.Student student)
        {
            var model = _context.Students.FirstOrDefault(s => s.Id == student.Id);
            Validate(model);

            model.Group = _context.Groups.FirstOrDefault(x => x.Id == student.GroupId);

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Student model)
        {
            if (model is null)
                throw new NotFoundException("No Group Found.");
        }
    }
}
