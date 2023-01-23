using rest_api.Models;

namespace rest_api.Data
{
    public class UsersMockData
    {   
        public static List<User> userList = new List<User>
        {
            new User { Id=1, FirstName="Johnny", LastName="Gabriel", Email="j-gabriel@gmail.com", Password="somepass123", CreatedAt=DateTime.Now },
            new User { Id=1, FirstName="Kimberly", LastName="Sanchez", Email="kimsan12@gmail.com", Password="thirtytwo32", CreatedAt=DateTime.Now },
            new User { Id=1, FirstName="Kevin", LastName="Lim", Email="kevinlim20@gmail.com", Password="ninetynine99", CreatedAt=DateTime.Now },
            new User { Id=1, FirstName="Hardy", LastName="Emmanuel", Email="hardyem1290@aol.com", Password="fortyfive45", CreatedAt=DateTime.Now },
            new User { Id=1, FirstName="Boyle", LastName="McCaugahee", Email="boylemccaugahee@yahoo.com", Password="twentyfive25", CreatedAt=DateTime.Now }
        };
    }
}
