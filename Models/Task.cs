using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class Task
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Status { get; set; }

    public string? Description { get; set; }

    public DateOnly? DueDate { get; set; }

    public int StudentCode { get; set; }

    public int ProjectId { get; set; }
}
