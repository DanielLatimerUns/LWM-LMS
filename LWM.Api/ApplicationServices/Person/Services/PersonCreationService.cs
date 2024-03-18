namespace LWM.Api.ApplicationServices.Person.Services
{
    using LWM.Api.ApplicationServices.Person.Contracts;
    using LWM.Api.DomainServices.PersonService.Contracts;
    using LWM.Api.DomainServices.StudentService.Contracts;
    using LWM.Api.DomainServices.TeacherService.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Api.Framework.Exceptions;
    using Microsoft.IdentityModel.Tokens;

    public class PersonCreationService(
        IPersonWriteService personWriteService,
        IStudentWriteService studentWriteService,
        ITeacherWriteService teacherWriteService) : IPersonCreationService
    {
        public async Task<int> Execute(Person person)
        {
            ValidatePerson(person);

            var personid = await personWriteService.CreateAsync(person);
            person.Student.PersonId = personid;
            person.Teacher.PersonId = personid;

            if (person.PersonType is Enums.PersonType.Student)
                await studentWriteService.CreateAsync(person.Student);
            if (person.PersonType is Enums.PersonType.Teacher)
                await teacherWriteService.CreateAsync(person.Teacher);

            return personid;
        }

        private static void ValidatePerson(Person person)
        {
            if (person is null)
                throw new BadRequestException("No Person Provided.");

            if (person.Forename.IsNullOrEmpty())
                throw new BadRequestException("Missing Person Forename.");
        }
    }
}
