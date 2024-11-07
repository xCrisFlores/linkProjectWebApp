using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class InnoService
    {
        private readonly LinkProjectContext _context;

        public InnoService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Innovation>> FindAll(int id)
        {
            return await (from Innovation in _context.Innovations
                        join ProjectInnovation in _context.ProjectInnovations
                        on Innovation.Id equals ProjectInnovation.InnovationId
                        where ProjectInnovation.ProjectId == id
                        select Innovation).ToListAsync();
        }

        public async Task<Innovation> FindOne(int project_id, int id)
        {
            return await (from Innovation in _context.Innovations
                        join ProjectInnovation in _context.ProjectInnovations
                        on Innovation.Id equals ProjectInnovation.InnovationId
                        where ProjectInnovation.ProjectId == project_id && Innovation.Id == id
                        select Innovation).FirstOrDefaultAsync();
        }

        public async Task<int> Insert(InnoORM inno)
        {
            var innovation = new Innovation
            {
                Name = inno.Name,
                Description = inno.Description
            };

            _context.Innovations.Add(innovation);
            
            try
            {
                await _context.SaveChangesAsync();
                var projectInno = new ProjectInnovation
                {
                    ProjectId = inno.ProjectId,
                    InnovationId = innovation.Id
                };
                _context.ProjectInnovations.Add(projectInno);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
            
        }

        public async Task Update(int id, InnoORM inno)
        {
             var existingInno = await _context.ProjectInnovations.FirstOrDefaultAsync(r => r.ProjectId == inno.ProjectId && r.InnovationId == id);
             if (existingInno != null)
             {
                var toUpdate = await _context.Innovations.FirstOrDefaultAsync(r => r.Id == existingInno.Id);
                toUpdate.Name = inno.Name;
                toUpdate.Description = inno.Description;
                await _context.SaveChangesAsync();
             }
             else
             {
                throw new Exception("Innovation not found");
             }
        }

        public async Task Delete(int project_id, int id)
        {
            var existingInno = await _context.ProjectInnovations.FirstOrDefaultAsync(s => s.ProjectId == project_id && s.InnovationId == id);
            if (existingInno != null)
            {
                _context.ProjectInnovations.Remove(existingInno);
                await _context.SaveChangesAsync();
                var toDelete = await _context.Innovations.FirstOrDefaultAsync(s => s.Id == existingInno.InnovationId);
                if (toDelete != null)
                {
                    _context.Innovations.Remove(toDelete);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                throw new Exception("Innovation not found");
            }
        }

    }
    
}