using LWM.Api.ApplicationServices.PersonServices.Contracts;
using LWM.Api.DomainServices.PersonService.Contracts;
using LWM.Api.DomainServices.StudentService.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.PersonServices.Queries
{
    public class PersonQueries(
        IPersonReadService personReadService,
        IStudentReadService studentReadService,
        ITeacherReadService teacherReadService) : IPersonQueries
    {

        public async Task<IEnumerable<Person>> Get()
        {
            return await personReadService.Get();
        }

        public async Task<IEnumerable<Student>> GetStudentForPerson(int personId)
        {
            return await studentReadService.Get((x) => x.Person.Id == personId);
        }

        //public async Task<IEnumerable<Student>> GetTeacherForPerson(int personId)
        //{
        //    return await studentReadService.Get((x) => x.Person.Id == personId);
        //}
    }
}
