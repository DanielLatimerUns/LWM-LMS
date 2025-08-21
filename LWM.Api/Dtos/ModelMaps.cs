using LWM.Api.Dtos.Models;
using LWM.Data.Models.Person;
using LWM.Data.Models.TimeTable;

namespace LWM.Api.Dtos;

public static class ModelMaps
{
    public static TimeTableModel ToModel(this TimeTable model)
    {
        return new TimeTableModel
        {
            Name = model.Name,
            IsPublished = model.IsPublished,
            Id = model.Id,
            Days = model.Days.Select(x => new TimeTableDayModel
            {
                Id = x.Id,
                DayOfWeek = x.DayOfWeek,
                TimeTableId = x.TimeTableId,
                TimeTableEntries = x.TimeTableEntries.Select(x => new TimeTableEntryModel
                {
                    Id = x.Id,
                    GroupId = x.GroupId,
                    StartTime = x.StartTime,
                    EndTime = x.EndTime,
                    TimeTableDayId = x.TimeTableDayId
                }).ToList()
            }).ToList()
        };
    }

    public static TeacherModel ToModel(this Teacher model)
    {
        return new TeacherModel
        {
            Id = model.Id,
            Name = model.Person != null ? $"{model.Person.Forename}, {model.Person.Surname}" : "No Person Record",
            PersonId = model.Person != null ? model.Person.Id : null
        };
    }
    
    public static StudentModel ToModel(this Student student)
    {
        return new StudentModel
        {
            Id = student.Id,
            Name = student.Person != null ? $"{student.Person.Forename}, {student.Person.Surname}" : "No Person Record",
            PersonId = student.Person != null ? student.Person.Id : null,
            GroupId = student.Group != null ? student.Group.Id : null
        };
    }
}