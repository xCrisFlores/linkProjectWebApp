using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/student/skills")]
    public class SkillsController : ControllerBase
    {
        private readonly SkillsService _service;

        public SkillsController(SkillsService SkillService)
        {
            _service = SkillService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills(int code)
        {
            try
            {
                var skills = await _service.FindAll(code);
                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{code}/{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int code, int id)
        {
            try
            {
                var skill = await _service.FindOne(code, id);
                if (skill == null)
                {
                    return NotFound();
                }
                return Ok(skill);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromBody] SkillObj skill)
        {
            if (skill == null)
            {
                return BadRequest("Skill is null.");
            }

            try
            {
                int created = await _service.Insert(skill);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Skill added successfully", 
                        skill = skill.Skilldesc
                    });
                }

                return StatusCode(500, "Failed to add skill.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePerson(int id, [FromBody] SkillObj skill)
        {
            if (skill == null)
            {
                return BadRequest("Skill data is incorrect or incomplete.");
            }

            try
            {
                await _service.Update(id, skill);
                return Ok(new 
                    { 
                        message = "Skill updated successfully", 
                        skill = skill.Skilldesc
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{code}/{id}")]
        public async Task<IActionResult> DeletePerson(int code, int id)
        {
            try
            {
                await _service.Delete(code, id);
                return Ok(new 
                    { 
                        message = "Skill deleted successfully", 
                        skill = id
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
