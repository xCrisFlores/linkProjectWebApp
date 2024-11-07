using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public interface IMetReqService
    {
        Task<IEnumerable<MeetingRequest>> FindAll(int project_id);
        Task<MeetingRequest> FindOne(int project, int id);
        Task<int> Insert(MeetingRequest req);
        Task Update(MeetingRequest req);
        Task SetState(ConfirmMeeting req);
        
    }

    
}