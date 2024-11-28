using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IInnoService
    {
        Task<IEnumerable<Innovation>> FindAllInno();
        Task<IEnumerable<Innovation>> FindAll(int project_id);
        Task<Innovation> FindOne(int project, int id);
        Task<int> Insert(InnoORM inno);
        Task Update(int id, InnoORM inno);
        Task Delete(int project, int id);
        
    }

    
}