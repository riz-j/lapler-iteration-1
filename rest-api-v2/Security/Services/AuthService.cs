using rest_api_v2.Data;
using rest_api_v2.Security.Services;

namespace rest_api_v2.Security.Services;

public class AuthService
{
    private AppDbContext _db;
    private JWTService _JWTService;
    public AuthService(AppDbContext db, JWTService JWTService)
    {
        _db = db;
        _JWTService = JWTService;
    }
    public bool IsProjectMember(int projectId, string Authorization)
    {
        int _userId = _JWTService.ParseBearerString(Authorization).UniqueName;
        
        List<int> ProjectMemberIds = _db.Users_Projects.Where(p => p.ProjectId == projectId).Select(p => p.UserId).ToList();
            
        bool projectContainsMember = ProjectMemberIds.Contains<int>(_userId);
        return projectContainsMember;
    }

    public bool IsProjectAdmin(int projectId, string Authorization)
    {
        int _userId = _JWTService.ParseBearerString(Authorization).UniqueName;

        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        if (_project == null)
        {
            return false;
        }

        if (_project.AdminId != _userId)
        {
            return false;
        }

        return true;
    }
}
