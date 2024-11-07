using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IAreaService
    {
        Task<IEnumerable<Area>> FindAll(int project_id);
        Task<Area> FindOne(int project, int id);
        Task<int> Insert(AreaORM area);
        Task Update(int id, AreaORM area);
        Task Delete(int project, int id);
        
    }

    
}