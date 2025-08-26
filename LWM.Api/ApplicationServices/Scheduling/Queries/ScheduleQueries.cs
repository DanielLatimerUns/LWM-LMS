using System.Globalization;
using System.Linq.Expressions;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.ViewModels;
using LWM.Data.Contexts;
using LWM.Data.Models.Schedule;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.ApplicationServices.Scheduling.Queries
{
    public interface IScheduleQueries
    {
        IEnumerable<ScheduleEntryModel> GetScheduleEntries(
            Expression<Func<ScheduleItem, bool>> filter = null);

        LessonViewModel GetCurrentLessonForTeacher(UserViewModel userViewModel);
        LessonFeedViewModel GetCurrentLessonFeedForTeacher(UserViewModel userViewModel);
    }

    public class ScheduleQueries(
        CoreContext context) : IScheduleQueries
    {
        public IEnumerable<ScheduleEntryModel> GetScheduleEntries(
            Expression<Func<ScheduleItem, bool>> filter = null)
        {
            var query = context.Schedules
                .Include(x => x.Group);

            if (filter != null)
                query.Where(filter);

            return query.Select(x => new ScheduleEntryModel
            {
                Id = x.Id,
                GroupId = x.Group.Id,
                SchedualedDayOfWeek = x.ScheduledDayOfWeek,
                SchedualedStartTime = x.ScheduledStartTime.ToString("HH:mm"),
                SchedualedEndTime = x.ScheduledEndTime.ToString("HH:mm"),
                HourStart = x.ScheduledStartTime.Hour,
                HourEnd = x.ScheduledEndTime.Hour,
                MinuteStart = x.ScheduledStartTime.Minute,
                MinuteEnd = x.ScheduledEndTime.Minute,
                DurationMinutes = (x.ScheduledEndTime - x.ScheduledStartTime).TotalMinutes,
                SchedualedDayOfWeekName = ((DayOfWeek)x.ScheduledDayOfWeek).ToString(),
                Repeat = x.Repeat,
                StartWeek = x.StartWeek
            });
        }

        public LessonViewModel GetCurrentLessonForTeacher(UserViewModel userViewModel)
        {
            var currentDayOFWeekk = (int)DateTime.Now.DayOfWeek;
            var currentTime = DateTime.Now;

            var lessonSchedule =
                context.Schedules
                    .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                    .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                    .FirstOrDefault(x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                                         && x.ScheduledDayOfWeek == currentDayOFWeekk
                                         && TimeOnly.FromDateTime(currentTime)
                                             .IsBetween(x.ScheduledStartTime, x.ScheduledEndTime));

            if (lessonSchedule is null)
                lessonSchedule = context.Schedules
                    .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                    .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                    .FirstOrDefault(x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                                         && x.ScheduledDayOfWeek == currentDayOFWeekk
                                         && TimeOnly.FromDateTime(currentTime) <= x.ScheduledStartTime);

            var lesson =
                context.Lessons
                    .Include(x => x.Documents)
                    .FirstOrDefault(x => x.LessonNo == lessonSchedule.Group.CompletedLessonNo + 1);

            if (lesson is null)
                return new LessonViewModel();

            var viewModel = new LessonViewModel
            {
                ScheduleEntry =
                    new ScheduleEntryModel
                    { 
                        Id = lessonSchedule.Id,
                        SchedualedEndTime = lessonSchedule.ScheduledEndTime.ToString(),
                        SchedualedStartTime = lessonSchedule.ScheduledStartTime.ToString()
                    },
                Lesson =
                    new LessonModel
                    { 
                        Id = lesson.Id, 
                        Name = lesson.Name, 
                        LessonNo = lesson.LessonNo },
                Students =
                    lessonSchedule.Group.Students
                    .Select(x => new StudentModel
                    { 
                        Id = x.Id, 
                        Name = x.Person.Forename + " " + x.Person.Surname 
                    }),
                Group =
                    new GroupModel
                    { 
                        Name = lessonSchedule.Group.Name, 
                        Id = lessonSchedule.Id 
                    },
                Documents =
                    lesson.Documents
                    .Select(x => new LessonDocumentModel
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
            var currentDayOfWeek = (int) DateTime.Now.DayOfWeek;

            var lessonSchedules =
                context.Schedules
                .Include(x => x.Group).ThenInclude(x => x.Students).ThenInclude(x => x.Person)
                .Include(x => x.Group).ThenInclude(x => x.Teacher).ThenInclude(x => x.Person)
                .Where(
                    x => x.Group.Teacher.Person.Id == userViewModel.PersonId
                    && x.ScheduledDayOfWeek == currentDayOfWeek && (x.Repeat == 0 || x.StartWeek + x.Repeat >= DateTime.Now.YearWeek()))
                .OrderBy(x => x.ScheduledStartTime);

            if (!lessonSchedules.Any())
                return new LessonFeedViewModel();
            
            var feed = new LessonFeedViewModel
            {
                Lessons = []
            };

            foreach(var lessonSchedule in lessonSchedules )
            {
                var lesson =
                    context.Lessons
                        .Include(x => x.Documents)
                        .FirstOrDefault(x => x.LessonNo == lessonSchedule.Group.CompletedLessonNo + 1);

                var viewModel = new LessonViewModel
                {
                    ScheduleEntry =
                    new ScheduleEntryModel
                    {
                        Id = lessonSchedule.Id,
                        SchedualedEndTime = lessonSchedule.ScheduledEndTime.ToString(),
                        SchedualedStartTime = lessonSchedule.ScheduledStartTime.ToString()
                    },
                    Lesson =
                    new Dtos.Models.LessonModel
                    {
                        Id = lesson.Id,
                        Name = lesson.Name,
                        LessonNo = lesson.LessonNo
                    },
                    Students =
                    lessonSchedule.Group.Students
                    .Select(x => new StudentModel
                    {
                        Id = x.Id,
                        Name = x.Person.Forename + " " + x.Person.Surname
                    }),
                    Group =
                    new GroupModel
                    {
                        Name = lessonSchedule.Group.Name,
                        Id = lessonSchedule.Id
                    },
                    Documents =
                    lesson.Documents
                    .Select(x => new LessonDocumentModel
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
