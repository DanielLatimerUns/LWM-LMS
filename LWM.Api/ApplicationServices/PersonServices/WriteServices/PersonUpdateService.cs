using LWM.Api.ApplicationServices.PersonService.Contracts;
using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Contexts;
using Microsoft.IdentityModel.Tokens;

namespace LWM.Api.ApplicationServices.PersonServices.WriteServices
{
    public class PersonUpdateService(
        IPersonWriteService personWriteService,
        IStudentWriteService studentWriteService,
        ITeacherWriteService teacherWriteService,
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
            if (person.PersonType is not 1) return;

            var student = coreContext.Students.FirstOrDefault(x => x.Person.Id == person.Id);

            if (student is null)
            {
                await studentWriteService.CreateAsync(person.Student);
                return;
            }

            person.Student.Id = student.Id;
            await studentWriteService.UpdateeAsync(person.Student);
        }

        private async Task UpdateTeacher(Person person)
        {
            if (person.PersonType is not 2) return;

            if (coreContext.Teachers.FirstOrDefault(x => x.Id == person.Teacher.Id) is null)
            {
                await teacherWriteService.CreateAsync(person.Teacher);
                return;
            }

            await teacherWriteService.UpdateeAsync(person.Teacher);
        }

        private static void ValidatePerson(Person person)
        {
            if (person is null)
                throw new BadHttpRequestException("No Person Provided.");

            if (person.Forename.IsNullOrEmpty())
                throw new BadHttpRequestException("Missing Person Forename.");
        }
    }
}