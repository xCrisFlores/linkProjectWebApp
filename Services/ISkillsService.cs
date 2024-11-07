using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface ISkillService
    {
        Task<IEnumerable<Skill>> FindAll(int code);
        Task<Skill> FindOne(int Code, int id);
        Task<int> Insert(SkillObj skill);
        Task Update(SkillObj skill);
        Task Delete(int Code, int id);
        
    }

    
}