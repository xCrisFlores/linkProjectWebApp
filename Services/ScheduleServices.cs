using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class ScheduleServices
    {
        private readonly LinkProjectContext _context;

        public ScheduleServices(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Schedule>> FindAll(int ScheduleId)
        {
            var schedule = await _context.Schedules.FirstOrDefaultAsync(x => x.StudentCode == ScheduleId);
            if(schedule !=  null){
                return await _context.Schedules.Where(d => d.StudentCode == schedule.StudentCode).ToListAsync();
            }else{
                throw new Exception("Schedule not found");
            }
            
        }

        public async Task<int> Insert(Schedule day)
        {
            _context.Schedules.Add(day);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(Schedule day)
        {
            var toUpdate = await _context.Schedules.FirstOrDefaultAsync(x => x.StudentCode == day.StudentCode && x.Day == day.Day);
            if (toUpdate != null)
            {
                toUpdate.StartTime = day.StartTime;
                toUpdate.EndTime = day.EndTime;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Schedule not found");
            }
        }

    }
    
}