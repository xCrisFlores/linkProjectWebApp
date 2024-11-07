using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class ProjectRequirement
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public int ReqId { get; set; }
}
