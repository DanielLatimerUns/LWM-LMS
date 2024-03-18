namespace LWM.Api.ApplicationServices.Person.Services
{
    using LWM.Api.ApplicationServices.Person.Contracts;
    using LWM.Api.DomainServices.PersonService.Contracts;
    using LWM.Api.DomainServices.StudentService.Contracts;
    using LWM.Api.DomainServices.TeacherService.Contracts;
    using LWM.Api.Framework.Exceptions;
    using LWM.Data.Contexts;
    using LWM.Data.Models;

    public class PersonDeleteService(
        IPersonWriteService personWriteService,
        IStudentWriteService studentWriteService,
        CoreContext coreContext) : IPersonDeleteService
    {
        public async Task Execute(int personId)
        {
            var personRecord = coreContext.Persons.Find(personId);

            if (personRecord is null)
                throw new NotFoundException("Person Not Found");

            await RemoveStudent(personRecord);
            await RemoveTeacher(personRecord);

            await personWriteService.DeleteAsync(personId);
        }

        private async Task RemoveStudent(Person person)
        {
            if (person.PersonType is not 1) return;

            var studentRecord = coreContext.Students.FirstOrDefault(x => x.Person.Id == person.Id);

            if (studentRecord is null) return;

            await studentWriteService.DeleteAsync(studentRecord.Id);
        }

        private async Task RemoveTeacher(Person person)
        {
            if (person.PersonType is not 2) return;

            var teacherRecord = coreContext.Teachers.FirstOrDefault(x => x.Person.Id == person.Id);

            if (teacherRecord is null) return;

            await studentWriteService.DeleteAsync(teacherRecord.Id);
        }
    }
}