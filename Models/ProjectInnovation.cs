using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class ProjectInnovation
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public int InnovationId { get; set; }
}
