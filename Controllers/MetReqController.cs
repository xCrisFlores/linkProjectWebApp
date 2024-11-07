using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/meetings")]
    public class MetReqController : ControllerBase
    {
        private readonly MetReqService _metReqService;

        public MetReqController(MetReqService metReqService)
        {
            _metReqService = metReqService;
        }

        [HttpGet("{project_id}")]
        public async Task<ActionResult<IEnumerable<MeetingRequest>>> GetRequests(int project_id)
        {
            try
            {
                var reqs = await _metReqService.FindAll(project_id);
                return Ok(reqs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<IEnumerable<MeetingRequest>>> GetRequest(int project_id, int id)
        {
            try
            {
                var req = await _metReqService.FindOne(project_id, id);
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
        public async Task<IActionResult> CreateReq([FromBody] MeetingRequest req)
        {
            if (req == null)
            {
                return BadRequest("Request data is null or invalid.");
            }

            try
            {
                int created = await _metReqService.Insert(req);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Request created successfully"
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
        public async Task<IActionResult> UpdateReq([FromBody] MeetingRequest req)
        {
            if (req == null)
            {
                return BadRequest("Request data is incorrect or incomplete.");
            }

            try
            {
                await _metReqService.Update(req);
                return Ok(new 
                    { 
                        message = "Request updated successfully", 
                        id = req.Id ,
                        user = req.AdviserCode,
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("confirm")]
        public async Task<IActionResult> ConfirmReq([FromBody] ConfirmMeeting req)
        {
            if (req == null)
            {
                return BadRequest("Data is incorrect or incomplete.");
            }

            try
            {
                await _metReqService.SetState(req);
                return Ok(new 
                    { 
                        message = "Request accepted successfully", 
                        id = req.Id ,
                        user = req.StudentCode,
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
