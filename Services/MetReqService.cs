using Microsoft.EntityFrameworkCore;
using LinkprojectAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace LinkprojectAPI.Services
{
    public class MetReqService
    {
        private readonly LinkProjectContext _context;

        public MetReqService(LinkProjectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MeetingRequest>> FindAll(int project_id)
        {
            return await _context.MeetingRequests.Where(m => m.ProjectId == project_id).ToListAsync();
        }

        public async Task<MeetingRequest> FindOne(int project_id, int id)
        {
            return await _context.MeetingRequests.FirstOrDefaultAsync(x => x.ProjectId == project_id && x.Id == id);
        }

        public async Task<int> Insert(MeetingRequest req)
        {
            // Agregar la solicitud de reunión primero
            _context.MeetingRequests.Add(req);

            try
            {
                // Guardar los cambios para que se genere el ID del MeetingRequest
                await _context.SaveChangesAsync();

                // Obtener el ID generado para la reunión (req.Id ahora tiene el valor)
                int meetId = req.Id;

                // Obtener los miembros del proyecto basados en el ProjectId de la solicitud de reunión
                var members = await _context.ProjectMembers
                                            .Where(p => p.ProjectId == req.ProjectId)
                                            .ToListAsync();

                // Crear una lista para almacenar los objetos ConfirmMeeting
                var confirmMeetings = new List<ConfirmMeeting>();

                // Generar un registro ConfirmMeeting para cada miembro del proyecto
                foreach (var member in members)
                {
                    var confirmMeeting = new ConfirmMeeting
                    {
                        Accepted = false, // Inicialmente marcar como no aceptado
                        StudentCode = member.UserCode, // Asignar el código del estudiante
                        ProjectId = req.ProjectId, // Asignar el ID del proyecto
                        MeetId = meetId // Asignar el ID de la reunión generada
                    };

                    // Agregar el registro a la lista
                    confirmMeetings.Add(confirmMeeting);
                }

                // Agregar todos los registros de confirmación de la reunión a la tabla ConfirmMeeting
                _context.ConfirmMeetings.AddRange(confirmMeetings);

                // Guardar los registros de confirmación
                await _context.SaveChangesAsync();

                return 1;
            }
            catch (Exception ex)
            {
                return 0; // Manejar el error de inserción
            }
        }

       public async Task Update(MeetingRequest req)
        {
            var toUpdate = await _context.MeetingRequests.FindAsync(req.Id);
            if (toUpdate != null)
            {
                toUpdate.Message = req.Message;
                toUpdate.ScheduleTime = req.ScheduleTime;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Request not found");
            }
        }

        public async Task SetState(ConfirmMeeting req)
        {
            // Actualiza la respuesta de la confirmación del estudiante
            var confirmation = await _context.ConfirmMeetings
                .FirstOrDefaultAsync(cm => cm.MeetId == req.MeetId && cm.StudentCode == req.StudentCode);

            if (confirmation == null)
            {
                throw new Exception("Confirmation not found for the given meeting and student.");
            }

            confirmation.Accepted = req.Accepted;
            await _context.SaveChangesAsync();

            // Verifica si todas las confirmaciones del meet_id han sido aceptadas
            var allAccepted = await _context.ConfirmMeetings
                .Where(cm => cm.MeetId == req.MeetId)
                .AllAsync(cm => cm.Accepted == true);

            if (allAccepted)
            {
                // Si todas las confirmaciones fueron aceptadas, actualiza el estado de la solicitud de la reunión
                var meetingRequest = await _context.MeetingRequests
                    .FirstOrDefaultAsync(mr => mr.Id == req.MeetId);

                if (meetingRequest != null)
                {
                    meetingRequest.Status = "Confirmada";
                    await _context.SaveChangesAsync();
                }
            }
        }

        
    }
    
}