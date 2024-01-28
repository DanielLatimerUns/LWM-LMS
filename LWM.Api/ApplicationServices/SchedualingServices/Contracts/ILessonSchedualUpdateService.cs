﻿using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface ILessonSchedualUpdateService
    {
        Task Execute(LessonSchedule lessonSchedule);
    }
}