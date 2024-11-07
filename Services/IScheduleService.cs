using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IScheduleService
    {
        Task<IEnumerable<Schedule>> FindAll(int ScheduleId);
        Task<int> Insert(Schedule day);
        Task Update(Schedule day);
        
    }

    
}