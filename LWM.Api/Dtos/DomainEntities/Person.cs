﻿using LWM.Api.Enums;

namespace LWM.Api.Dtos.DomainEntities
{
    public class Person
    {
        public int Id { get; set; }

        public string? Forename { get; set; }

        public string? Surname { get; set; }

        public string? EmailAddress1 { get; set; }

        public string? PhoneNo { get; set; }

        // need to refactor into a ENUm once I figure out de-serializing enums in .core
        public PersonType PersonType { get; set; }

        public Student Student { get; set; } = new();

        public Teacher Teacher { get; set; } = new();
    }
}
