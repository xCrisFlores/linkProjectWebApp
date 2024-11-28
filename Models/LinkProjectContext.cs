using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LinkprojectAPI.Models;

public partial class LinkProjectContext : DbContext
{
    public LinkProjectContext()
    {
    }

    public LinkProjectContext(DbContextOptions<LinkProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Adviser> Advisers { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<ConfirmMeeting> ConfirmMeetings { get; set; }

    public virtual DbSet<Innovation> Innovations { get; set; }

    public virtual DbSet<MeetingRequest> MeetingRequests { get; set; }

    public virtual DbSet<MemberRequest> MemberRequests { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<ProjectArea> ProjectAreas { get; set; }

    public virtual DbSet<ProjectInnovation> ProjectInnovations { get; set; }

    public virtual DbSet<ProjectMember> ProjectMembers { get; set; }

    public virtual DbSet<ProjectRequirement> ProjectRequirements { get; set; }

    public virtual DbSet<Requirement> Requirements { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentSkill> StudentSkills { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=Msi\\SQLEXPRESS;Database=LinkProject;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Adviser>(entity =>
        {
            entity.HasKey(e => e.AdviserCode).HasName("PK__Adviser__D7074BC6534E6659");

            entity.ToTable("Adviser");

            entity.Property(e => e.AdviserCode)
                .ValueGeneratedNever()
                .HasColumnName("adviser_code");
            entity.Property(e => e.Division)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("division");
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__areas__3214EC27D02DD356");

            entity.ToTable("areas");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<ConfirmMeeting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Confirm___3213E83FB93366E3");

            entity.ToTable("Confirm_meeting");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Accepted).HasColumnName("accepted");
            entity.Property(e => e.MeetId).HasColumnName("meet_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.StudentCode).HasColumnName("student_code");
        });

        modelBuilder.Entity<Innovation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__innovati__3213E83F30D76652");

            entity.ToTable("innovation");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MeetingRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Meeting___3214EC2733F90E22");

            entity.ToTable("Meeting_request");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AdviserCode).HasColumnName("adviser_code");
            entity.Property(e => e.Message)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("message");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.ScheduleTime)
                .HasColumnType("datetime")
                .HasColumnName("schedule_time");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        modelBuilder.Entity<MemberRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Member_r__3214EC27519A8159");

            entity.ToTable("Member_request");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.StudentCode).HasColumnName("student_code");
            entity.Property(e => e.SubmittedDate).HasColumnName("submitted_date");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Project__3214EC27A3DFF135");

            entity.ToTable("Project");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AvailableSpaces).HasColumnName("available_spaces");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Path)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("path");
        });

        modelBuilder.Entity<ProjectArea>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__project___3214EC27373B4107");

            entity.ToTable("project_areas");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AreaId).HasColumnName("area_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
        });

        modelBuilder.Entity<ProjectInnovation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__project___3214EC272987D535");

            entity.ToTable("project_innovation");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.InnovationId).HasColumnName("innovation_id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
        });

        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Project___3213E83FDB3EE94E");

            entity.ToTable("Project_members");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Type)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.UserCode).HasColumnName("user_code");
        });

        modelBuilder.Entity<ProjectRequirement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__project___3214EC27CCF81752");

            entity.ToTable("project_requirements");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.ReqId).HasColumnName("req_id");
        });

        modelBuilder.Entity<Requirement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__requirem__3214EC27DB86F15C");

            entity.ToTable("requirements");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.StudentCode).HasName("PK__Schedule__DBBE77C81F3870BF");

            entity.ToTable("Schedule");

            entity.Property(e => e.StudentCode)
                .ValueGeneratedNever()
                .HasColumnName("Student_code");
            entity.Property(e => e.Day)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("day");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Skills__3214EC27D64753DE");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Skill1)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("skill");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentCode).HasName("PK__Student__6DF33C449C9F32FC");

            entity.ToTable("Student");

            entity.Property(e => e.StudentCode)
                .ValueGeneratedNever()
                .HasColumnName("student_code");
            entity.Property(e => e.Biography)
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasColumnName("biography");
            entity.Property(e => e.Lab)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("lab");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        modelBuilder.Entity<StudentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Student___3214EC2711F3DEC7");

            entity.ToTable("Student_skills");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.StudentCode).HasColumnName("student_code");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tasks__3214EC27936E222F");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.DueDate).HasColumnName("due_date");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.StudentCode).HasColumnName("student_code");
            entity.Property(e => e.Title)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("PK__User__357D4CF8A98E16E1");

            entity.ToTable("User");

            entity.Property(e => e.Code)
                .ValueGeneratedNever()
                .HasColumnName("code");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Path)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("path");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
