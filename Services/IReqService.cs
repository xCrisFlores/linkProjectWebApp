using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IReqServies
    {
        Task<IEnumerable<Requirement>> FindAll(int project_id);
        Task<Requirement> FindOne(int project, int id);
        Task<int> Insert(RequirementORM req);
        Task Update(int id, RequirementORM req);
        Task Delete(int project, int id);
        
    }

    
}