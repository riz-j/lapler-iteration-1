using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using rest_api_v2.Controllers.Services;
using rest_api_v2.Data;
using rest_api_v2.Security;
using rest_api_v2.Security.Interfaces;
using rest_api_v2.Security.Services;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(option => 
{
    option.UseNpgsql("Host=172.104.46.87:5432;Username=rizki;Password=arrahman;Database=lapler-api-v2");
});

builder.Services.AddScoped<IUserRepository, UserRepository>();

var key = builder.Configuration.GetValue<string>("ApiSettings:Secret");

builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.MaxDepth = 32;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme 
    {
        Description = "JWT Authorization header uses the bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement() 
    {
        { 
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddTransient<UsersService>();
builder.Services.AddTransient<ProjectsService>();
builder.Services.AddTransient<IssuesService>();
builder.Services.AddTransient<JWTService>();
builder.Services.AddTransient<AuthService>();

var app = builder.Build();

app.UseCors(options => 
{
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    // options.WithOrigins("localhost:5173").AllowAnyMethod().AllowAnyHeader();
    // Code in the line above somehow still does not work.
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
