using LWM.Api.ApplicationServices.PersonService.Contracts;
using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Api.Framework.Services;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LWM.Api.ApplicationServices.PersonServices.WriteServices
{
    public class PersonUpdateService(
        IPersonWriteService personWriteService,
        IStudentWriteService studentWriteService,
        ITeacherWriteService teacherWriteService,

        IApplicationInstanceService applicationInstanceService,
        CoreContext coreContext) : IPersonUpdateService
    {
        public async Task Execute(Person person)
        {
            ValidatePerson(person);

            person.Student.PersonId = person.Id;
            person.Teacher.PersonId = person.Id;

            await personWriteService.UpdateAsync(person);

            await UpdateStudent(person);
            await UpdateTeacher(person);

        }

        private async Task UpdateStudent(Person person)
        {
            if (person.PersonType is not Enums.PersonType.Student)
            {
                var students = coreContext.Students.Where(x => x.Person.Id == person.Id);
                coreContext.Students.RemoveRange(students);
            }
            else
            {
                this.ValidateStudent(person.Student);

                var student = coreContext.Students.FirstOrDefault(x => x.Person.Id == person.Id);

                if (student is null)
                {
                    await studentWriteService.CreateAsync(person.Student);
                    return;
                }

                person.Student.Id = student.Id;
                await studentWriteService.UpdateeAsync(person.Student);
            }
        }

        private async Task UpdateTeacher(Person person)
        {
            if (person.PersonType is not Enums.PersonType.Teacher)
            {
                var teachers = coreContext.Teachers.Where(x => x.Person.Id == person.Id);
                coreContext.Teachers.RemoveRange(teachers);
            }
            else
            {
                var teacher = coreContext.Teachers.Include(x => x.Person).FirstOrDefault(x => x.Person.Id == person.Id);
                if (teacher is null)
                {
                    await teacherWriteService.CreateAsync(person.Teacher);
                    return;
                }

                person.Teacher.Id = teacher.Id;
                await teacherWriteService.UpdateeAsync(person.Teacher);
            }


        }

        private static void ValidatePerson(Person person)
        {
            if (person is null)
                throw new BadRequestException("No Person Provided.");

            if (person.Forename.IsNullOrEmpty())
                throw new BadRequestException("Missing Person Forename.");
        }

        private void ValidateStudent(Student student)
        {
            if (student.GroupId is not null && !coreContext.Groups.Any(x => x.Id == student.GroupId))
            {
                throw new NotFoundException("Group not found.");
            }
        }
    }
}