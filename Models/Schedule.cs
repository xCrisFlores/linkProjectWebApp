using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class Schedule
{
    public int StudentCode { get; set; }

    public string? Day { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }
}
