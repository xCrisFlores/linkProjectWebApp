using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/areas")]
    public class AreaController : ControllerBase
    {
        private readonly AreaService _service;

        public AreaController(AreaService areaService)
        {
            _service = areaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas(int project_id)
        {
            try
            {
                var areas = await _service.FindAll(project_id);
                return Ok(areas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{id}")]
        public async Task<ActionResult<Area>> GetArea(int project_id, int id)
        {
            try
            {
                var area = await _service.FindOne(project_id,id);
                if (area == null)
                {
                    return NotFound();
                }
                return Ok(area);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateArea([FromBody] AreaORM area)
        {
            if (area == null)
            {
                return BadRequest("Area is null.");
            }

            try
            {
                int created = await _service.Insert(area);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Area added successfully", 
                        area = area.Name
                    });
                }

                return StatusCode(500, "Failed to add area.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArea(int id, [FromBody]AreaORM area)
        {
            if (area == null)
            {
                return BadRequest("Area data is incorrect or incomplete.");
            }

            try
            {
                await _service.Update(id, area);
                return Ok(new 
                { 
                    message = "Area updated successfully", 
                    id = id, 
                    project = area.ProjectId 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{project_id}/{id}")]
        public async Task<IActionResult> DeleteArea(int project_id, int id)
        {
            try
            {
                var area = await _service.FindOne(project_id, id);
                if (area == null)
                {
                    return NotFound();
                }

                await _service.Delete(project_id, id);
                return Ok(new 
                { 
                    message = "Area deleted successfully", 
                    project_id = project_id, 
                    id = id 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
