using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class Student
{
    public int StudentCode { get; set; }

    public string? Phone { get; set; }

    public string? Status { get; set; }

    public string? Lab { get; set; }

    public string? Biography { get; set; }
}
