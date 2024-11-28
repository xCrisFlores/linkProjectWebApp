using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IMembersServices
    {
        Task<IEnumerable<ProjectMember>> FindAll(int id);
        Task<ProjectMember> FindOne(int project_id, int id);
        Task<int> Insert(ProjectMember member);
        Task Delete(int project_id, int id);
        
    }

    
}