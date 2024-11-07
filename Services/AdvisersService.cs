using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class AdvisersService
    {
        private readonly LinkProjectContext _context;

        public AdvisersService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Adviser>> FindAll()
        {
            return await _context.Advisers.ToListAsync();
        }

        public async Task<Adviser> FindOne(int Code)
        {
            return await _context.Advisers.FirstOrDefaultAsync(x => x.AdviserCode == Code);
        }

        public async Task<int> Insert(Adviser adviser)
        {
            _context.Advisers.Add(adviser);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(Adviser adviser)
        {
            var toUpdate = await _context.Advisers.FindAsync(adviser.AdviserCode);
            if (toUpdate != null)
            {
            
                toUpdate.Division = adviser.Division;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Person not found");
            }
        }

    }
    
}