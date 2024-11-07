using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly StudentsService _studentService;

        public StudentController(StudentsService studentsService)
        {
            _studentService = studentsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetUsers()
        {
            try
            {
                var student = await _studentService.FindAll();
                return Ok(student);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetUser(int Code)
        {
            try
            {
                var user = await _studentService.FindOne(Code);
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
        public async Task<IActionResult> CreatePerson([FromBody] Student user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            try
            {
                int created = await _studentService.Insert(user);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "Student added successfully", 
                        student = user.StudentCode
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
        public async Task<IActionResult> UpdatePerson([FromBody] Student user)
        {
            if (user == null)
            {
                return BadRequest("User data is incorrect or incomplete.");
            }

            try
            {
                var existingUser = await _studentService.FindOne(user.StudentCode);
                if (existingUser == null)
                {
                    return NotFound();
                }

                await _studentService.Update(user);
                return Ok(new 
                    { 
                        message = "Student updated successfully", 
                        student = user.StudentCode
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
