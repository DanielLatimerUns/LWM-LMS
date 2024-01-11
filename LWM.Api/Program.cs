using LWM.Api.LessonService;
using LWM.Api.LessonService.Contracts;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ILessonReadService, LessonReadService>();
builder.Services.AddTransient<ILessonWriteService, LessonWriteService>();

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

app.Run();
