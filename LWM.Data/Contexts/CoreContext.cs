using LWM.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LWM.Data.Contexts
{
    public class CoreContext : DbContext
    {
        public DbSet<AzureObjectLink> AzureObjectLinks { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<LessonSchedule> LessonSchedules { get; set; }

        public DbSet<Document> Documents { get; set; }

        public DbSet<LessonInstance> Instances { get; set; }

        public DbSet<LessonSchedule> Schedules { get; set; }

        public DbSet<Person> Persons { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Configuration> Configurations { get; set; }

        public DbSet<Curriculum> LessonCurriculums { get; set; }

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
