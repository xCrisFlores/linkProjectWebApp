using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project")]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            try
            {
                var projects = await _projectService.FindAll();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            try
            {
                var project = await _projectService.FindOne(id);
                if (project == null)
                {
                    return NotFound();
                }
                return Ok(project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Project project)
        {
            if (project == null)
            {
                return BadRequest("Project is null.");
            }

            try
            {
                int created = await _projectService.Insert(project);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Project created successfully", 
                        id = project.Id ,
                        project = project.Name,
                    });
                }

                return StatusCode(500, "Failed to create Project.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject([FromBody] Project project)
        {
            if (project == null)
            {
                return BadRequest("Project data is incorrect or incomplete.");
            }

            try
            {
                var existingUser = await _projectService.FindOne(project.Id);
                if (existingUser == null)
                {
                    return NotFound();
                }

                await _projectService.Update(project);
                return Ok(new 
                    { 
                        message = "Project updated successfully", 
                        id = project.Id ,
                        project = project.Name,
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var project = await _projectService.FindOne(id);
                if (project == null)
                {
                    return NotFound();
                }

                await _projectService.Delete(id);
                return Ok(new 
                    { 
                        message = "Project deleted successfully", 
                        id = project.Id ,
                        name = project.Name,
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
