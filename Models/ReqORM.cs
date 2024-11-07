using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;
public partial class RequirementORM
{
    public int ProjectId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }
}