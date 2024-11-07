using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class ProjectArea
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public int AreaId { get; set; }
}
