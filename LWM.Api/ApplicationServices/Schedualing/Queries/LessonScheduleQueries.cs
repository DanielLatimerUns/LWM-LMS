namespace LWM.Api.ApplicationServices.Schedualing.Queries
{
    using LWM.Api.ApplicationServices.Schedualing.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Api.Dtos.ViewModels;
    using LWM.Data.Contexts;
    using LWM.Data.Models;
    using LWM.Web.ViewModels;
    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
    using System.Linq;
    using System.Linq.Expressions;
    using Group = LWM.Api.Dtos.DomainEntities.Group;
    using Student = LWM.Api.Dtos.DomainEntities.Student;

    public class LessonScheduleQueries(
        CoreContext context) : ILessonScheduleQueries
    {
        public IEnumerable<Dtos.DomainEntities.LessonSchedule> GetLessonSchedules(
            Expression<Func<Data.Models.LessonSchedule, bool>> filter = null)
        {
            var query = context.LessonSchedules
                .Include(x => x.Group);

            if (filter != null)
                query.Where(filter);

            return query.Select(x => new Dtos.DomainEntities.LessonSchedule
            {
                Id = x.Id,
                GroupId = x.Group.Id,
                SchedualedDayOfWeek = x.SchedualedDayOfWeek,
                SchedualedStartTime = x.SchedualedStartTime.ToString("HH:mm"),
                SchedualedEndTime = x.SchedualedEndTime.ToString("HH:mm"),
                HourStart = x.SchedualedStartTime.Hour,
                HourEnd = x.SchedualedEndTime.Hour,
                MinuteStart = x.SchedualedStartTime.Minute,
                MinuteEnd = x.SchedualedEndTime.Minute,
                DurationMinutes = (x.SchedualedEndTime - x.SchedualedStartTime).TotalMinutes,
                SchedualedDayOfWeekName = ((DayOfWeek)x.SchedualedDayOfWeek).ToString(),
                Repeat = x.Repeat,
                StartWeek = x.StartWeek
            });
        }

        public LessonViewModel GetCurrentLessonForTeacher(UserViewModel userViewModel)
        {
            var currentDayOFWeekk = (int)DateTime.Now.DayOfWeek;
            var currentTime = DateTime.Now;

            var lessonSchedule =
                context.LessonSchedules
                .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                .FirstOrDefault(
                    x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                    && x.SchedualedDayOfWeek == currentDayOFWeekk
                    && TimeOnly.FromDateTime(currentTime).IsBetween(x.SchedualedStartTime, x.SchedualedEndTime));

            if (lessonSchedule is null)
                lessonSchedule = context.LessonSchedules
                .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                .FirstOrDefault(
                    x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                    && x.SchedualedDayOfWeek == currentDayOFWeekk
                    && TimeOnly.FromDateTime(currentTime) <= x.SchedualedStartTime);

            var lesson =
                context.Lessons
                .Include(x => x.Documents)
                .Where(x => x.LessonNo == lessonSchedule.Group.CompletedLessonNo + 1)
                .FirstOrDefault();

            if (lesson is null)
                return new LessonViewModel();

            var viewModel = new LessonViewModel
            {
                LessonSchedule =
                    new Dtos.DomainEntities.LessonSchedule
                    { 
                        Id = lessonSchedule.Id,
                        SchedualedEndTime = lessonSchedule.SchedualedEndTime.ToString(),
                        SchedualedStartTime = lessonSchedule.SchedualedStartTime.ToString()
                    },
                Lesson =
                    new Dtos.DomainEntities.Lesson
                    { 
                        Id = lesson.Id, 
                        Name = lesson.Name, 
                        LessonNo = lesson.LessonNo },
                Students =
                    lessonSchedule.Group.Students
                    .Select(x => new Student 
                    { 
                        Id = x.Id, 
                        Name = x.Person.Forename + " " + x.Person.Surname 
                    }),
                Group =
                    new Group 
                    { 
                        Name = lessonSchedule.Group.Name, 
                        Id = lessonSchedule.Id 
                    },
                Documents =
                    lesson.Documents
                    .Select(x => new LessonDocument 
                    { 
                        Id = x.Id, 
                        Name = x.Name, 
                        Path = x.DocumentPath 
                    }),
            };

            return viewModel;
        }

        public LessonFeedViewModel GetCurrentLessonFeedForTeacher(UserViewModel userViewModel)
        {
            var cal = new CultureInfo("en-Us").Calendar;
            int currentWeek = cal.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
            var currentDayOFWeek = ((int)DateTime.Now.DayOfWeek);
            var currentTime = DateTime.Now;

            var lessonSchedules =
                context.LessonSchedules
                .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                .Where(
                    x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                    && x.SchedualedDayOfWeek == currentDayOFWeek && (x.Repeat == 0 || (x.StartWeek + x.Repeat >= currentWeek)))
                .OrderBy(x => x.SchedualedStartTime);

            if (!lessonSchedules.Any())
                return new LessonFeedViewModel();


            var feed = new LessonFeedViewModel
            {
                Lessons = new List<LessonViewModel>()
            };

            foreach(var lessonSchedule in lessonSchedules )
            {
                var lesson =
                    context.Lessons
                    .Include(x => x.Documents)
                    .Where(x => x.LessonNo == lessonSchedule.Group.CompletedLessonNo + 1)
                    .FirstOrDefault();

                var viewModel = new LessonViewModel
                {
                    LessonSchedule =
                    new Dtos.DomainEntities.LessonSchedule
                    {
                        Id = lessonSchedule.Id,
                        SchedualedEndTime = lessonSchedule.SchedualedEndTime.ToString(),
                        SchedualedStartTime = lessonSchedule.SchedualedStartTime.ToString()
                    },
                    Lesson =
                    new Dtos.DomainEntities.Lesson
                    {
                        Id = lesson.Id,
                        Name = lesson.Name,
                        LessonNo = lesson.LessonNo
                    },
                    Students =
                    lessonSchedule.Group.Students
                    .Select(x => new Dtos.DomainEntities.Student
                    {
                        Id = x.Id,
                        Name = x.Person.Forename + " " + x.Person.Surname
                    }),
                    Group =
                    new Dtos.DomainEntities.Group
                    {
                        Name = lessonSchedule.Group.Name,
                        Id = lessonSchedule.Id
                    },
                    Documents =
                    lesson.Documents
                    .Select(x => new LessonDocument
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Path = x.DocumentPath
                    }),
                };

                feed.Lessons.Add(viewModel);
            }

            
            return feed;
        }
    }
}
