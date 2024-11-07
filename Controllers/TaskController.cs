using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/project/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("project/{project_id}")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasksForProject(int project_id)
        {
            try
            {
                var tasks = await _taskService.FindAllForProject(project_id);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("student/{code}")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTaskForStudent(int code)
        {
            try
            {
                var tasks = await _taskService.FindAllForStudent(code);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{project_id}/{code}/{id}")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTask(int project_id, int code, int id)
        {
            try
            {
                var req = await _taskService.FindOne(project_id, code, id);
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
        public async Task<IActionResult> CreateTask([FromBody] Models.Task task)
        {
            if (task == null)
            {
                return BadRequest("Task data is null or invalid.");
            }

            try
            {
                int created = await _taskService.Insert(task);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Task created successfully", 
                        task = task.Title
                    });
                }

                return StatusCode(500, "Failed to create task.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTask([FromBody] Models.Task task)
        {
            if (task == null)
            {
                return BadRequest("Task data is incorrect or incomplete.");
            }

            try
            {
                await _taskService.Update(task);
                return Ok(new 
                    { 
                        message = "Task updated successfully", 
                        task = task.Title
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{project_id}/{code}/{id}")]
        public async Task<IActionResult> DeleteTask(int project_id, int code, int id)
        {
            try
            {
                await _taskService.Delete(project_id, code, id);
                return Ok(new 
                    { 
                        message = "Task deleted successfully", 
                        project = project_id,
                        task = id
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
