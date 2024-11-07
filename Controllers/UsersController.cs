using Microsoft.AspNetCore.Mvc;
using LinkprojectAPI.Models;
using LinkprojectAPI.Services;

namespace LinkprojectAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UsersService _userService;

        public UserController(UsersService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var user = await _userService.FindAll();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int Code)
        {
            try
            {
                var user = await _userService.FindOne(Code);
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
        public async Task<IActionResult> CreatePerson([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            try
            {
                int created = await _userService.Insert(user);
                if (created == 1)
                {
                    return Ok(new 
                    { 
                        message = "User created successfully", 
                        user = user.Code
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
        public async Task<IActionResult> UpdatePerson([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is incorrect or incomplete.");
            }

            try
            {
                var existingUser = await _userService.FindOne(user.Code);
                if (existingUser == null)
                {
                    return NotFound();
                }

                await _userService.Update(user);
                return Ok(new 
                    { 
                        message = "User updated successfully", 
                        user = user.Code
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int Code)
        {
            try
            {
                var user = await _userService.FindOne(Code);
                if (user == null)
                {
                    return NotFound();
                }

                await _userService.Delete(Code);
                return Ok(new 
                    { 
                        message = "User deleted successfully", 
                        user = user.Code
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("{user}/{password}")]
        public async Task<IActionResult> Login(string Email, string pass)
        {
            if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(pass))
            {
                return BadRequest("Invalid or insufficient credentials");
            }

            try
            {
                var logged = await _userService.Login(Email, pass);
                if (logged == true)
                {
                    return Ok(true); 
                }
                else
                {
                    return Unauthorized(); 
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
