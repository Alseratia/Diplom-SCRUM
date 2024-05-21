﻿using System.Text;
using AuthMicroservice.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AuthMicroservice;

public static class JwtAuthenticationExtension
{
  public static IServiceCollection AddJwtAuthentication(this IServiceCollection services)
  {
    services.AddAuthentication(o =>
    {
      o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
      o.RequireHttpsMetadata = false;
      o.SaveToken = true;
      o.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtTokenService.SecretKey))
      };
    });

    return services;
  }
}