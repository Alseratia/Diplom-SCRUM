﻿namespace AuthMicroservice.Controllers;

public class RefreshRequest
{
  public string RefreshToken { get; set; } = null!;
}