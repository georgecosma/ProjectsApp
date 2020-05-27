using System;

namespace ProjectsApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ScheduledDate { get; set; }
        public decimal Price { get; set; }
    }
}