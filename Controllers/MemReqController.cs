using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/members/request")]
    public class MemReqController : ControllerBase
    {
        private readonly MemReqService _memReqService;

        public MemReqController(MemReqService memReqService)
        {
            _memReqService = memReqService;
        }

        [HttpGet("{project_id}")]
        public async Task<ActionResult<IEnumerable<MemberRequest>>> GetRequests(int project_id)
        {
            try
            {
                var reqs = await _memReqService.FindAll(project_id);
                return Ok(reqs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<IEnumerable<MemberRequest>>> GetRequest(int project_id, int id)
        {
            try
            {
                var req = await _memReqService.FindOne(project_id, id);
                if(req == null){
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
        public async Task<IActionResult> CreateReq([FromBody] MemberRequest req)
        {
            if (req == null)
            {
                return BadRequest("Request data is null or invalid.");
            }

            try
            {
                int created = await _memReqService.Insert(req);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Request created successfull"
                    });
                }

                return StatusCode(500, "Failed to create request.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateReq([FromBody] MemberRequest req)
        {
            if (req == null)
            {
                return BadRequest("Request data is incorrect or incomplete.");
            }

            try
            {
                await _memReqService.Update(req);
                return Ok(new 
                { 
                    message = "Request updated successfully", 
                    id = req.Id ,
                    user = req.StudentCode,
                    status = req.Status
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
