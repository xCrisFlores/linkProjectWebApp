using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class ReqService
    {
        private readonly LinkProjectContext _context;

        public ReqService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Requirement>> FindAll(int id)
        {
            return await (from requirement in _context.Requirements
                        join ProjectRequirement in _context.ProjectRequirements
                        on requirement.Id equals ProjectRequirement.ReqId
                        where ProjectRequirement.ProjectId == id
                        select requirement).ToListAsync();
        }

        public async Task<Requirement> FindOne(int project_id, int id)
        {
            return await (from requirement in _context.Requirements
                        join ProjectRequirement in _context.ProjectRequirements
                        on requirement.Id equals ProjectRequirement.ReqId
                        where ProjectRequirement.ProjectId == project_id && requirement.Id == id
                        select requirement).FirstOrDefaultAsync();
        }

        public async Task<int> Insert(RequirementORM req)
        {
            var requierement = new Requirement
            {
                Name = req.Name,
                Description = req.Description
            };

            _context.Requirements.Add(requierement);
            
            try
            {
                await _context.SaveChangesAsync();
                var projectReq = new ProjectRequirement
                {
                    ProjectId = req.ProjectId,
                    ReqId = requierement.Id
                };
                _context.ProjectRequirements.Add(projectReq);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
            
        }

        public async Task Update(int id, RequirementORM req)
        {
             var existingReq = await _context.ProjectRequirements.FirstOrDefaultAsync(r => r.ProjectId == req.ProjectId && r.ReqId == id);
             if (existingReq != null)
             {
                var toUpdate = await _context.Requirements.FirstOrDefaultAsync(r => r.Id == existingReq.Id);
                toUpdate.Name = req.Name;
                toUpdate.Description = req.Description;
                await _context.SaveChangesAsync();
             }
             else
             {
                throw new Exception("Requirement not found");
             }
        }

        public async Task Delete(int project_id, int id)
        {
            var existingReq = await _context.ProjectRequirements.FirstOrDefaultAsync(s => s.ProjectId == project_id && s.ReqId == id);
            if (existingReq != null)
            {
                var toDelete = await _context.Requirements.FirstOrDefaultAsync(s => s.Id == id);
                _context.Requirements.Remove(toDelete);
                _context.ProjectRequirements.Remove(existingReq);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Requirement not found");
            }
        }

    }
    
}