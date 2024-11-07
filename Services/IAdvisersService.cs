using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IAdviserService
    {
        Task<IEnumerable<Adviser>> FindAll();
        Task<Adviser> FindOne(int Code);
        Task<int> Insert(Adviser user);
        Task Update(Adviser user);
        
    }

    
}