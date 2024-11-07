using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class MemReqService
    {
        private readonly LinkProjectContext _context;

        public MemReqService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MemberRequest>> FindAll(int project_id)
        {
            return await _context.MemberRequests.Where(m => m.ProjectId == project_id).ToListAsync();
        }

        public async Task<MemberRequest> FindOne(int project_id, int id)
        {
            return await _context.MemberRequests.FirstOrDefaultAsync(x => x.ProjectId == project_id && x.Id == id);
        }

         public async Task<int> Insert(MemberRequest req)
        {
            _context.MemberRequests.Add(req);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(MemberRequest req)
        {
            var toUpdate = await _context.MemberRequests.FindAsync(req.Id);
            if (toUpdate != null)
            {
                toUpdate.Status = req.Status;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Request not found");
            }
        }
        
    }
    
}