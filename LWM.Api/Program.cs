using LWM.Api.Framework.Services;
using LWM.Api.Middleware.Exceptions;
using LWM.Api.Middleware.Request;
using LWM.Authentication;
using LWM.Authentication.DataAccess;
using LWM.Data.Contexts;
using LWM.Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.Runtime.CompilerServices;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// need to add con string...
builder.Services.AddDbContext<CoreContext>(
    options => options.UseSqlServer(configuration.GetConnectionString("LWM"), 
    c => c.MigrationsAssembly("LWM.Api")));

// Auth
builder.Services.AddDbContext<AuthenticationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("LWM"),
    c => c.MigrationsAssembly("LWM.Api")));

builder.Services.AddMemoryCache();

var jwtAppSettingOptions = configuration.GetSection(nameof(JwtIssuerOptions));


builder.Services.Configure<JwtIssuerOptions>(options =>
{
    options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
    options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
    options.SigningCredentials = new SigningCredentials(KeyFactory.GetKey(), SecurityAlgorithms.HmacSha256);
});

var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = false,
    ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

    ValidateAudience = false,
    ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

    ValidateIssuerSigningKey = true,
    IssuerSigningKey = KeyFactory.GetKey(),

    RequireExpirationTime = false,
    ValidateLifetime = true,
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(configureOptions =>
{
    configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
    configureOptions.TokenValidationParameters = tokenValidationParameters;
    configureOptions.SaveToken = true;
});

// api user claim policy
builder.Services.AddAuthorization();

var identityBuilder = builder.Services.AddIdentityCore<User>(o =>
{
    // configure identity options
    o.Password.RequireDigit = false;
    o.Password.RequireLowercase = false;
    o.Password.RequireUppercase = false;
    o.Password.RequireNonAlphanumeric = false;
    o.Password.RequiredLength = 6;
});

identityBuilder = new IdentityBuilder(identityBuilder.UserType, typeof(Role), identityBuilder.Services);
identityBuilder.AddEntityFrameworkStores<AuthenticationDbContext>().AddDefaultTokenProviders();

ServiceBuilder.BuildServices(builder.Services);

var app = builder.Build();

app.UseMiddleware<ProductionApiExceptionHandler>();
app.UseMiddleware<RequestStateInjectionHandler>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(cors => cors.AllowAnyOrigin().
                        AllowAnyHeader().
                        AllowAnyMethod().SetIsOriginAllowed(origin => true));

app.UseStatusCodePages();

app.Run();
