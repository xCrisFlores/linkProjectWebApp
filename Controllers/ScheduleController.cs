using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/student/shchedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleServices _scheduleService;

        public ScheduleController(ScheduleServices scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedule(int code)
        {
            try
            {
                var schedule = await _scheduleService.FindAll(code);
                return Ok(schedule);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateDay([FromBody] Schedule day)
        {
            if (day == null)
            {
                return BadRequest("Day is null.");
            }

            try
            {
                int created = await _scheduleService.Insert(day);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Day added successfully", 
                        day = day.Day 
                    });
                }

                return StatusCode(500, "Failed to add day.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDay([FromBody] Schedule day)
        {
            if (day == null)
            {
                return BadRequest("Day data is incorrect or incomplete.");
            }

            try
            {
                await _scheduleService.Update(day);
                return Ok(new 
                    { 
                        message = "Day updated successfully", 
                        day = day.Day
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
