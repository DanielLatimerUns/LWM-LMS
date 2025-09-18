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
            Entries = model.TimeTableEntries.Select(x => new TimeTableEntryModel
            {
                Id = x.Id,
                GroupId = x.GroupId,
                StartTime = x.StartTime.ToString("HH:mm"),
                EndTime = x.EndTime.ToString("HH:mm"),
                DayNumber = x.DayNumber,
                TeacherId = x.TeacherId
                
            }).ToList()
        };
    }

    public static TeacherModel ToModel(this Teacher model)
    {
        return new TeacherModel
        {
            Id = model.Id,
            Name = model.Person != null ? $"{model.Person.Forename}, {model.Person.Surname}" : "No Person Record",
            PersonId = model.Person?.Id
        };
    }
    
    public static StudentModel ToModel(this Student student)
    {
        return new StudentModel
        {
            Id = student.Id,
            Name = student.Person != null ? $"{student.Person.Forename}, {student.Person.Surname}" : "No Person Record",
            PersonId = student.Person?.Id,
            GroupId = student.Group?.Id,
            SessionPaymentAmount = student.SessionPaymentAmount,
            PaymentMethod = student.PaymentMethod,
        };
    }
}