using Microsoft.AspNetCore.Identity;

namespace LWM.Authentication.DataAccess
{
    public class User:IdentityUser
    {
        public int PersonId { get; set; }
    }
    public class Role:IdentityRole
    {

    }
}
