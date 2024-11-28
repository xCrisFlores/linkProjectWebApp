using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/innovations")]
    public class InnoController : ControllerBase
    {
        private readonly InnoService _service;

        public InnoController(InnoService innoService)
        {
            _service = innoService;
        }

        [HttpGet("all/")]
        public async Task<ActionResult<IEnumerable<Innovation>>> GetAllInnos()
        {
            try
            {
                var innos = await _service.FindAllInno();
                return Ok(innos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Innovation>>> GetInnos(int project_id)
        {
            try
            {
                var innos = await _service.FindAll(project_id);
                return Ok(innos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<Innovation>> GetInno(int project_id, int id)
        {
            try
            {
                var inno = await _service.FindOne(project_id,id);
                if (inno == null)
                {
                    return NotFound();
                }
                return Ok(inno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateInno([FromBody] InnoORM inno)
        {
            if (inno == null)
            {
                return BadRequest("Innovation is null.");
            }

            try
            {
                int created = await _service.Insert(inno);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Innovation added successfully", 
                        inno = inno.Name
                    });
                }

                return StatusCode(500, "Failed to add innovation.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInno(int id, [FromBody]InnoORM inno)
        {
            if (inno == null)
            {
                return BadRequest("Innovation data is incorrect or incomplete.");
            }

            try
            {
                await _service.Update(id, inno);
                return Ok(new 
                { 
                    message = "Area updated successfully", 
                    id = id, 
                    project = inno.ProjectId 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{project_id}/{id}")]
        public async Task<IActionResult> DeleteInno(int project_id, int id)
        {
            try
            {
                var inno = await _service.FindOne(project_id, id);
                if (inno == null)
                {
                    return NotFound();
                }

                await _service.Delete(project_id, id);
                return Ok(new 
                { 
                    message = "Innovation deleted successfully", 
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
