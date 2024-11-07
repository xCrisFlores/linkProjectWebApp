using System;
using System.Collections.Generic;

namespace LinkprojectAPI.Models;

public partial class ConfirmMeeting
{
    public int Id { get; set; }

    public bool? Accepted { get; set; }

    public int StudentCode { get; set; }

    public int ProjectId { get; set; }

    public int MeetId { get; set; }
}
