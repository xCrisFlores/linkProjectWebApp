using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IMemReqService
    {
        Task<IEnumerable<MemberRequest>> FindAll(int project_id);
        Task<MemberRequest> FindOne(int project, int id);
        Task<int> Insert(MemberRequest req);
        Task Update(MemberRequest req);
        
    }

    
}