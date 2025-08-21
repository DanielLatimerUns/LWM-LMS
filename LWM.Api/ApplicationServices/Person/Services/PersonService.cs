using LWM.Api.DomainServices.Person.Contracts;
using LWM.Api.DomainServices.Student.Contracts;
using LWM.Api.DomainServices.Teacher.Contracts;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.ApplicationServices.Person.Services
{
    using Framework.Exceptions;

    public interface IPersonService
    {
        Task<int> Create(Dtos.Models.PersonModel personModel);
        Task Delete(int personId);
        Task Update(Dtos.Models.PersonModel personModel);
    }

    public class PersonService(
        IPersonWriteService personWriteService,
        IStudentWriteService studentWriteService,
        ITeacherWriteService teacherWriteService,
        CoreContext coreContext) : IPersonService
    {
        public async Task<int> Create(Dtos.Models.PersonModel personModel)
        {
            ValidatePerson(personModel);

            var personid = await personWriteService.CreateAsync(personModel);
            personModel.Student.PersonId = personid;
            personModel.Teacher.PersonId = personid;

            if (personModel.PersonType is Enums.PersonType.Student)
                await studentWriteService.CreateAsync(personModel.Student);
            if (personModel.PersonType is Enums.PersonType.Teacher)
                await teacherWriteService.CreateAsync(personModel.Teacher);

            return personid;
        }
        
        public async Task Delete(int personId)
        {
            var personRecord = coreContext.Persons.Find(personId);

            if (personRecord is null)
                throw new NotFoundException("Person Not Found");

            await RemoveStudent(personRecord);
            await RemoveTeacher(personRecord);

            await personWriteService.DeleteAsync(personId);
        }
        
         public async Task Update(Dtos.Models.PersonModel personModel)
        {
            ValidatePerson(personModel);

            personModel.Student.PersonId = personModel.Id;
            personModel.Teacher.PersonId = personModel.Id;

            await personWriteService.UpdateAsync(personModel);

            await UpdateStudent(personModel);
            await UpdateTeacher(personModel);
        }

        private async Task UpdateStudent(Dtos.Models.PersonModel personModel)
        {
            if (personModel.PersonType is not Enums.PersonType.Student)
            {
                var students = coreContext.Students.Where(x => x.Person.Id == personModel.Id);
                coreContext.Students.RemoveRange(students);
            }
            else
            {
                this.ValidateStudent(personModel.Student);

                var student = coreContext.Students.FirstOrDefault(x => x.Person.Id == personModel.Id);

                if (student is null)
                {
                    await studentWriteService.CreateAsync(personModel.Student);
                    return;
                }

                personModel.Student.Id = student.Id;
                await studentWriteService.UpdateeAsync(personModel.Student);
            }
        }

        private async Task UpdateTeacher(Dtos.Models.PersonModel personModel)
        {
            if (personModel.PersonType is not Enums.PersonType.Teacher)
            {
                var teachers = coreContext.Teachers.Where(x => x.Person.Id == personModel.Id);
                coreContext.Teachers.RemoveRange(teachers);
            }
            else
            {
                var teacher = coreContext.Teachers.Include(x => x.Person)
                    .FirstOrDefault(x => x.Person.Id == personModel.Id);
                if (teacher is null)
                {
                    await teacherWriteService.CreateAsync(personModel.Teacher);
                    return;
                }

                personModel.Teacher.Id = teacher.Id;
                await teacherWriteService.UpdateAsync(personModel.Teacher);
            }
        }

        private static void ValidatePerson(Dtos.Models.PersonModel personModel)
        {
            if (personModel is null)
                throw new BadRequestException("No Person Provided.");

            if (string.IsNullOrEmpty(personModel.Forename))
                throw new BadRequestException("Missing Person Forename.");
        }

        private void ValidateStudent(Dtos.Models.StudentModel student)
        {
            if (student.GroupId is not null && !coreContext.Groups.Any(x => x.Id == student.GroupId))
            {
                throw new NotFoundException("Group not found.");
            }
        }
        
        private async Task RemoveStudent(Data.Models.Person.Person personModel)
        {
            if (personModel.PersonType is not 1) return;

            var studentRecord = coreContext.Students.FirstOrDefault(x => x.Person.Id == personModel.Id);

            if (studentRecord is null) return;

            await studentWriteService.DeleteAsync(studentRecord.Id);
        }

        private async Task RemoveTeacher(Data.Models.Person.Person person)
        {
            if (person.PersonType is not 2) return;

            var teacherRecord = coreContext.Teachers.FirstOrDefault(x => x.Person.Id == person.Id);

            if (teacherRecord is null) return;

            await studentWriteService.DeleteAsync(teacherRecord.Id);
        }
    }
}
