using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class MeetingRequest
{
    public int Id { get; set; }

    public string? Status { get; set; }

    public string? Message { get; set; }

    public DateTime? ScheduleTime { get; set; }

    public int AdviserCode { get; set; }

    public int ProjectId { get; set; }
}
