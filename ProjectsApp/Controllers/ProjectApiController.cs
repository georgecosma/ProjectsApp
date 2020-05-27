using ProjectsApp.DAL;
using ProjectsApp.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace ProjectsApp.Controllers
{
    public class ProjectApiController : ApiController
    {
        private ProjectsContext db = new ProjectsContext();
        public List<Project> Get()
        {
            return db.Projects.ToList();
        }

        public void Post(Project project)
        {
            if (ModelState.IsValid)
            {
                db.Projects.Add(project);
                db.SaveChanges();
            }
        }

        public void Put(Project project)
        {
            if (ModelState.IsValid)
            {
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            Project project = db.Projects.Find(id);
            db.Projects.Remove(project);
            db.SaveChanges();
        }
    }
}