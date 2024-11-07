using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/members")]
    public class MembersController : ControllerBase
    {
        private readonly MembersService _service;

        public MembersController(MembersService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectMember>>> GetMembers()
        {
            try
            {
                var members = await _service.FindAll();
                return Ok(members);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<User>> GetMember(int project_id, int id)
        {
            try
            {
                var user = await _service.FindOne(project_id, id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] ProjectMember user)
        {
            if (user == null)
            {
                return BadRequest("Member is null.");
            }

            try
            {
                int created = await _service.Insert(user);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Member added successfully", 
                        member = user.UserCode,
                        project = user.ProjectId
                    });
                }

                return StatusCode(500, "Failed to add member");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{project_id}/{id}")]
        public async Task<IActionResult> DeletePerson(int project_id, int id)
        {
            try
            {
                var user = await _service.FindOne(project_id, id);
                if (user == null)
                {
                    return NotFound();
                }

                await _service.Delete(project_id, id);
                return Ok(new 
                { 
                    message = "Member expelled successfully", 
                    id = id ,
                    project = project_id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
