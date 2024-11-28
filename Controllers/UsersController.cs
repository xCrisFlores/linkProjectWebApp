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
        private readonly ILogger<UserController> _logger;

        public UserController(UsersService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                _logger.LogInformation("Petición recibida para obtener todos los recursos.");
                var resources = await _userService.FindAll();
                if (!resources.Any())
                {
                    _logger.LogInformation("No se encontraron recursos disponibles.");
                    return NoContent(); // Cambiado de NotFound a NoContent para un enfoque RESTful
                }

                _logger.LogInformation("Recursos obtenidos correctamente.");
                return Ok(resources);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener los recursos: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int Code)
        {
            try
            {
                _logger.LogInformation("Petición recibida para obtener un recurso.");
                var resource = await _userService.FindOne(Code);
                if (resource == null)
                {
                    _logger.LogInformation("No se encontró el recurso solicitado.");
                    return NotFound("Recurso no encontrado.");
                }

                _logger.LogInformation("Recurso obtenido correctamente.");
                return Ok(resource);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el recurso: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateResource([FromBody] User resource)
        {
            if (resource == null)
            {
                _logger.LogWarning("La petición falló, el recurso enviado es nulo o incorrecto.");
                return BadRequest("El recurso proporcionado no es válido.");
            }

            try
            {
                _logger.LogInformation("Petición recibida para crear un recurso.");
                int created = await _userService.Insert(resource);
                if (created == 1)
                {
                    _logger.LogInformation("Recurso creado correctamente.");
                    return Ok(new
                    {
                        message = "Recurso creado exitosamente.",
                        resourceId = resource.Code
                    });
                }

                _logger.LogWarning("No se pudo crear el recurso.");
                return StatusCode(500, "No se pudo crear el recurso.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al crear el recurso: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateResource([FromBody] User resource)
        {
            if (resource == null)
            {
                _logger.LogWarning("La petición falló, el recurso proporcionado es incorrecto o incompleto.");
                return BadRequest("Los datos del recurso son incorrectos o incompletos.");
            }

            try
            {
                var existingResource = await _userService.FindOne(resource.Code);
                if (existingResource == null)
                {
                    _logger.LogWarning("El recurso que intentas modificar no existe.");
                    return NotFound("Recurso no encontrado.");
                }

                await _userService.Update(resource);
                _logger.LogInformation("Recurso modificado exitosamente.");
                return Ok(new
                {
                    message = "Recurso actualizado exitosamente.",
                    resourceId = resource.Code
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar el recurso: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int Code)
        {
            try
            {
                var resource = await _userService.FindOne(Code);
                if (resource == null)
                {
                    _logger.LogWarning("El recurso que intentas eliminar no existe.");
                    return NotFound("Recurso no encontrado.");
                }

                await _userService.Delete(Code);
                _logger.LogInformation("Recurso eliminado exitosamente.");
                return Ok(new
                {
                    message = "Recurso eliminado exitosamente.",
                    resourceId = resource.Code
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar el recurso: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("{user}/{password}")]
        public async Task<IActionResult> Login(string Email, string pass)
        {
            if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(pass))
            {
                return BadRequest("Credenciales inválidas o insuficientes.");
            }

            try
            {
                var logged = await _userService.Login(Email, pass);
                if (logged)
                {
                    _logger.LogInformation("Inicio de sesión exitoso.");
                    return Ok(true);
                }

                _logger.LogWarning("Credenciales incorrectas.");
                return Unauthorized("Credenciales incorrectas.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al iniciar sesión: {ex.Message}");
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
}
