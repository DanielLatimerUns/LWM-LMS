using LWM.Api.Framework.Services;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Runtime.CompilerServices;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ServiceBuilder.BuildServices(builder.Services);

// need to add con string...
builder.Services.AddDbContext<CoreContext>(
    options => options.UseSqlServer(configuration.GetConnectionString("LWM"), c => c.MigrationsAssembly("LWM.Api")));

var app = builder.Build();

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

app.Run();
