using ProjectsApp.Models;
using System;
using System.Collections.Generic;

namespace ProjectsApp.DAL
{
    public class ProjectsInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ProjectsContext>
    {
        protected override void Seed(ProjectsContext context)
        {
            var projects = new List<Project>
            {
                new Project { Name = "Project 1", ScheduledDate = DateTime.Parse("2020-05-25"), Price = Decimal.Parse("545")},
                new Project { Name = "Project 2", ScheduledDate = DateTime.Parse("2020-05-26"), Price = Decimal.Parse("635")},
                new Project { Name = "Project 3", ScheduledDate = DateTime.Parse("2020-05-23"), Price = Decimal.Parse("1540")}
            };

            projects.ForEach(p => context.Projects.Add(p));
            context.SaveChanges();
        }
    }
}