using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class MemberRequest
{
    public int Id { get; set; }

    public string? Status { get; set; }

    public DateOnly? SubmittedDate { get; set; }

    public int ProjectId { get; set; }

    public int StudentCode { get; set; }
}
