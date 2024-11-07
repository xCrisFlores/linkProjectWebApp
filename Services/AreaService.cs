using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class AreaService
    {
        private readonly LinkProjectContext _context;

        public AreaService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Area>> FindAll(int id)
        {
            return await (from area in _context.Areas
                        join ProjectArea in _context.ProjectAreas
                        on area.Id equals ProjectArea.AreaId
                        where ProjectArea.ProjectId == id
                        select area).ToListAsync();
        }

        public async Task<Area> FindOne(int project_id, int id)
        {
            return await (from area in _context.Areas
                        join ProjectArea in _context.ProjectAreas
                        on area.Id equals ProjectArea.AreaId
                        where ProjectArea.ProjectId == project_id && area.Id == id
                        select area).FirstOrDefaultAsync();
        }

        public async Task<int> Insert(AreaORM area)
        {
            var new_area = new Area
            {
                Name = area.Name,
                Description = area.Description
            };

            _context.Areas.Add(new_area);
            
            try
            {
                await _context.SaveChangesAsync();
                var projectArea = new ProjectArea
                {
                    ProjectId = area.ProjectId,
                    AreaId = new_area.Id
                };
                _context.ProjectAreas.Add(projectArea);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
            
        }

        public async Task Update(int id, AreaORM area)
        {
             var existingArea = await _context.ProjectAreas.FirstOrDefaultAsync(r => r.ProjectId == area.ProjectId && r.AreaId == id);
             if (existingArea != null)
             {
                var toUpdate = await _context.Areas.FirstOrDefaultAsync(r => r.Id == existingArea.Id);
                toUpdate.Name = area.Name;
                toUpdate.Description = area.Description;
                await _context.SaveChangesAsync();
             }
             else
             {
                throw new Exception("Area not found");
             }
        }

        public async Task Delete(int project_id, int id)
        {
            var existingArea = await _context.ProjectAreas.FirstOrDefaultAsync(s => s.ProjectId == project_id && s.AreaId == id);
            if (existingArea != null)
            {
                _context.ProjectAreas.Remove(existingArea);
                await _context.SaveChangesAsync();
                var toDelete = await _context.Areas.FirstOrDefaultAsync(s => s.Id == existingArea.AreaId);
                if (toDelete != null)
                {
                    _context.Areas.Remove(toDelete);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                throw new Exception("Area not found");
            }
        }

    }
    
}