using Microsoft.EntityFrameworkCore;
using rest_api_v2.Data;
using rest_api_v2.Security;
using rest_api_v2.Security.Interfaces;
using rest_api_v2.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(option => 
{
    option.UseNpgsql("Host=172.104.46.87:5432;Username=rizki;Password=arrahman;Database=lapler-api-v2");
});

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<UsersService>();
builder.Services.AddTransient<ProjectsService>();
builder.Services.AddTransient<IssuesService>();

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
