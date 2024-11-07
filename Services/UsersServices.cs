using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class UsersService
    {
        private readonly LinkProjectContext _context;

        public UsersService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> FindAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> FindOne(int Code)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Code == Code);
        }

        public async Task<int> Insert(User user)
        {
            _context.Users.Add(user);
            try{
                await _context.SaveChangesAsync();
                return 1;
            }catch(Exception){
                return 0;
            }
            
        }

       public async Task Update(User user)
        {
            var toUpdate = await _context.Users.FindAsync(user.Code);
            if (toUpdate != null)
            {
            
                toUpdate.Email = user.Email;
                toUpdate.Password = user.Password;
                toUpdate.Name = user.Name;
                toUpdate.Path = user.Path;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Person not found");
            }
        }


        public async Task Delete(int Code)
    {
        // Buscar al usuario en la tabla Users
        var user = await _context.Users.FindAsync(Code);
        
        if (user != null)
        {
            // Verificar si el usuario es un estudiante
            var student = await _context.Students.FindAsync(Code);
            if (student != null)
            {
                // Eliminar dependencias de estudiante

                // Eliminar habilidades relacionadas
                var studentSkills = _context.StudentSkills.Where(ss => ss.StudentCode == student.StudentCode);
                _context.StudentSkills.RemoveRange(studentSkills);
                
                // Eliminar horarios relacionados
                var schedules = _context.Schedules.Where(s => s.StudentCode == student.StudentCode);
                _context.Schedules.RemoveRange(schedules);

                // Eliminar solicitudes de miembro
                var memberRequests = _context.MemberRequests.Where(mr => mr.StudentCode == student.StudentCode);
                _context.MemberRequests.RemoveRange(memberRequests);

                // Eliminar tareas relacionadas
                var tasks = _context.Tasks.Where(t => t.StudentCode == student.StudentCode);
                _context.Tasks.RemoveRange(tasks);

                // Eliminar confirmaciones de reuniones 
                var confirmedMeetings = _context.ConfirmMeetings.Where(cm => cm.StudentCode == student.StudentCode);
                _context.ConfirmMeetings.RemoveRange(confirmedMeetings);

                // Eliminar el estudiante
                _context.Students.Remove(student);

            }
            else
            {
                // Verificar si el usuario es un asesor
                var adviser = await _context.Advisers.FindAsync(Code);
                if (adviser != null)
                {
                    // Eliminar dependencias de asesor

                    // Eliminar solicitudes de reunión del asesor (Meeting_request)
                    var meetingRequests = _context.MeetingRequests.Where(mr => mr.AdviserCode == adviser.AdviserCode);
                    _context.MeetingRequests.RemoveRange(meetingRequests);

                    // Eliminar al asesor
                    _context.Advisers.Remove(adviser);
                }
            }

            // Eliminar cualquier registro en la tabla Project_members relacionado con el usuario
            var projectMembers = _context.ProjectMembers.Where(pm => pm.UserCode == Code);
            _context.ProjectMembers.RemoveRange(projectMembers);

            // Finalmente, eliminar al usuario
            _context.Users.Remove(user);

            // Guardar los cambios
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("User not found");
        }
    }


       public async Task<bool> Login(string Email, string pass)
        {
            var person = await _context.Users.FirstOrDefaultAsync(x => x.Email == Email && x.Password == pass);
            return person != null; 
        }


    }
    
}