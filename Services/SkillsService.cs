using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class SkillsService
    {
        private readonly LinkProjectContext _context;

        public SkillsService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skill>> FindAll(int code)
        {
            return await (from skill in _context.Skills
                        join studentSkill in _context.StudentSkills
                        on skill.Id equals studentSkill.Id
                        where studentSkill.StudentCode == code
                        select skill).ToListAsync();
        }

        public async Task<Skill> FindOne(int code, int id)
        {
            return await (from skill in _context.Skills
                        join studentSkill in _context.StudentSkills
                        on skill.Id equals studentSkill.Id
                        where studentSkill.StudentCode == code && skill.Id == id
                        select skill).FirstOrDefaultAsync();
        }


         public async Task<int> Insert(SkillObj skillObj)
         {
            var skill = new Skill
            {
                Skill1 = skillObj.Skilldesc
            };

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            try
            {
                var studentSkill = new StudentSkill
                {
                    StudentCode = skillObj.Code,
                    SkillId = skill.Id
                };
                _context.StudentSkills.Add(studentSkill);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }


       public async Task Update(int id, SkillObj skill)
        {
            var existingSkill = await _context.StudentSkills.FirstOrDefaultAsync(s => s.StudentCode == skill.Code && s.SkillId == id);
            if (existingSkill != null)
            {
                var toUpdate = await _context.Skills.FirstOrDefaultAsync(s => s.Id == existingSkill.SkillId);
                toUpdate.Skill1 = skill.Skilldesc;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Skill not found");
            }
        }

        public async Task Delete(int code, int id)
        {
            var existingSkill = await _context.StudentSkills.FirstOrDefaultAsync(s => s.StudentCode == code && s.SkillId == id);
            if (existingSkill != null)
            {
                _context.StudentSkills.Remove(existingSkill);
                await _context.SaveChangesAsync();
                var toDelete = await _context.Skills.FirstOrDefaultAsync(s => s.Id == existingSkill.SkillId);
                if (toDelete != null)
                {
                    _context.Skills.Remove(toDelete);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                throw new Exception("Skill not found");
            }
        }

        

    }
    
}