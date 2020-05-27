using ProjectsApp.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ProjectsApp.DAL
{
    public class ProjectsContext : DbContext
    {
        public ProjectsContext() : base("ProjectsContext")
        { }

        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}