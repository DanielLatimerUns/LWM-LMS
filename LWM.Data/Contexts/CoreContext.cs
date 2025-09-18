using LWM.Data.Models;
using LWM.Data.Models.Curriculum;
using LWM.Data.Models.Document;
using LWM.Data.Models.Group;
using LWM.Data.Models.Lesson;
using LWM.Data.Models.Person;
using LWM.Data.Models.Schedule;
using LWM.Data.Models.TimeTable;
using Microsoft.EntityFrameworkCore;

namespace LWM.Data.Contexts
{
    public class CoreContext : DbContext
    {
        public DbSet<AzureObjectLink> AzureObjectLinks { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<ScheduleItem> Schedules { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<ScheduleInstance> Instances { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Configuration> Configurations { get; set; }
        public DbSet<Curriculum> LessonCurriculums { get; set; }
        public DbSet<TimeTable> TimeTables { get; set; }
        public DbSet<TimeTableEntry> TimeTableEntries { get; set; }

        public CoreContext(DbContextOptions<CoreContext> options)
        : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
