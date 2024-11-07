using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class TaskService
    {
        private readonly LinkProjectContext _context;

        public TaskService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.Task>> FindAllForProject(int project_id)
        {
            return await _context.Tasks.Where(t => t.ProjectId == project_id).ToListAsync();
        }

        public async Task<IEnumerable<Models.Task>> FindAllForStudent(int code)
        {
            return await _context.Tasks.Where(t => t.StudentCode == code).ToListAsync();
        }

        public async Task<Models.Task> FindOne(int project_id, int code, int id)
        {
            return await _context.Tasks.FirstOrDefaultAsync(t =>
                                                t.ProjectId == project_id && 
                                                t.StudentCode == code
                                                && t.Id == id);
        }
        public async Task<int> Insert(Models.Task task)
        {
            _context.Tasks.Add(task);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(Models.Task task)
        {
            var toUpdate = await _context.Tasks.FirstOrDefaultAsync(t =>
                                                t.ProjectId == task.ProjectId && 
                                                t.StudentCode == task.StudentCode 
                                                && t.Id == task.Id);
            if (toUpdate != null)
            {

                toUpdate.Title = task.Title;
                toUpdate.Status = task.Status;
                toUpdate.Description = task.Description;
                toUpdate.DueDate = task.DueDate;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Task not found");
            }
        }


        public async Task Delete(int project_id, int code, int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t =>
                                                t.ProjectId == project_id && 
                                                t.StudentCode == code
                                                && t.Id == id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }

    }
    
}