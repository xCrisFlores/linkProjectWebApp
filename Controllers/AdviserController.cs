using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/adviser")]
    public class AdviserController : ControllerBase
    {
        private readonly AdvisersService _adviserService;

        public AdviserController(AdvisersService advisersService)
        {
            _adviserService = advisersService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Adviser>>> GetUsers()
        {
            try
            {
                var adviser = await _adviserService.FindAll();
                return Ok(adviser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Adviser>> GetUser(int Code)
        {
            try
            {
                var user = await _adviserService.FindOne(Code);
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
        public async Task<IActionResult> CreatePerson([FromBody] Adviser user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            try
            {
                int created = await _adviserService.Insert(user);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Adviser added successfully", 
                        adviser = user.AdviserCode
                    });
                }

                return StatusCode(500, "Failed to create person.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePerson([FromBody] Adviser user)
        {
            if (user == null)
            {
                return BadRequest("User data is incorrect or incomplete.");
            }

            try
            {
                var existingUser = await _adviserService.FindOne(user.AdviserCode);
                if (existingUser == null)
                {
                    return NotFound();
                }

                await _adviserService.Update(user);
                return Ok(new 
                    { 
                        message = "Adviser updated successfully", 
                        adviser = user.AdviserCode
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
