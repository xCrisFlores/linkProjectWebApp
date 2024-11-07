using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class Project
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? AvailableSpaces { get; set; }

    public string? Path { get; set; }

    public DateOnly? CreationDate { get; set; }
}
