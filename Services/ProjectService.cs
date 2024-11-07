using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class ProjectService
    {
        private readonly LinkProjectContext _context;

        public ProjectService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> FindAll()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<Project> FindOne(int id)
        {
            return await _context.Projects.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(Project project)
        {
            _context.Projects.Add(project);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(Project project)
        {
            var toUpdate = await _context.Projects.FindAsync(project.Id);
            if (toUpdate != null)
            {
            
                toUpdate.Name = project.Name;
                toUpdate.Description = project.Description;
                toUpdate.AvailableSpaces = project.AvailableSpaces;
                toUpdate.Path = project.Path;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Project not found");
            }
        }


        public async Task Delete(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

    }
    
}