using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class ProjectMember
{
    public int Id { get; set; }

    public int UserCode { get; set; }

    public int ProjectId { get; set; }

    public string? Type { get; set; }
}
