using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class MembersService
    {
        private readonly LinkProjectContext _context;

        public MembersService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> FindAll(int id)
        {
            return await (from User in _context.Users
                        join ProjectMember in _context.ProjectMembers
                        on User.Code equals ProjectMember.UserCode
                        where ProjectMember.ProjectId == id
                        select User).ToListAsync();
        }

        public async Task<ProjectMember> FindOne(int project_id, int id)
        {
            return await _context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == project_id && x.Id == id);
        }

        public async Task<int> Insert(ProjectMember member)
        {
            _context.ProjectMembers.Add(member);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

        public async Task Delete(int project_id, int id)
        {
            var member = await _context.ProjectMembers.FirstOrDefaultAsync(x => x.ProjectId == project_id && x.Id == id);
            if (member != null)
            {
                _context.ProjectMembers.Remove(member);
                await _context.SaveChangesAsync();
            }
        }

    }
    
}