using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/requirements")]
    public class ReqController : ControllerBase
    {
        private readonly ReqService _service;

        public ReqController(ReqService reqService)
        {
            _service = reqService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Requirement>>> GetReqs(int project_id)
        {
            try
            {
                var reqs = await _service.FindAll(project_id);
                return Ok(reqs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<Skill>> GetReq(int project_id, int id)
        {
            try
            {
                var req = await _service.FindOne(project_id,id);
                if (req == null)
                {
                    return NotFound();
                }
                return Ok(req);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateReq([FromBody] RequirementORM req)
        {
            if (req == null)
            {
                return BadRequest("Requirement is null.");
            }

            try
            {
                int created = await _service.Insert(req);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Requirement added successfully", 
                        project = req.ProjectId ,
                        Req = req.Name,
                    });
                }

                return StatusCode(500, "Failed to add requirement.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReq(int id, [FromBody]RequirementORM req)
        {
            if (req == null)
            {
                return BadRequest("Requirement data is incorrect or incomplete.");
            }

            try
            {
                await _service.Update(id, req);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{project_id}/{id}")]
        public async Task<IActionResult> DeleteReq(int project_id, int id)
        {
            try
            {
                var skill = await _service.FindOne(project_id, id);
                if (skill == null)
                {
                    return NotFound();
                }

                await _service.Delete(project_id, id);
                return Ok(new 
                    { 
                        message = "Request deleted successfully", 
                        project = project_id,
                        req = id,
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
