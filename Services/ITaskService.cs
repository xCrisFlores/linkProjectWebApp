using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> FindAllForProject(int project_id);
        Task<IEnumerable<Task>> FindAllForStudent(int code);
        Task<Area> FindOne(int project, int code, int id);
        Task<int> Insert(Task area);
        Task Update(Task task);
        Task Delete(int project_id, int code, int id);
        
    }

    
}