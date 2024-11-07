using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> FindAll();
        Task<Project> FindOne(int id);
        Task<int> Insert(Project project);
        Task Update(Project project);
        Task Delete(int id);
        
    }

    
}