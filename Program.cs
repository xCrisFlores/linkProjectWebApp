using LinkprojectAPI.Models;
using LinkprojectAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

//Contexto de la base de datos
builder.Services.AddDbContext<LinkProjectContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Servicios para usuarios
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<StudentsService>();
builder.Services.AddScoped<ScheduleServices>();
builder.Services.AddScoped<SkillsService>();
builder.Services.AddScoped<AdvisersService>();

//Servicios para proyectos
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<MembersService>();
builder.Services.AddScoped<ReqService>();
builder.Services.AddScoped<AreaService>();
builder.Services.AddScoped<InnoService>();
builder.Services.AddScoped<MemReqService>();
builder.Services.AddScoped<MetReqService>();
builder.Services.AddScoped<TaskService>();

//Configurar Swagger/OpenAPI para documentación de la API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")// Agrega la URL de tu frontend para permitir los CURLS
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "LinkProject API V1");
        c.RoutePrefix = string.Empty; 
    });
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");
app.MapControllers();
app.Run();