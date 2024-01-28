using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LWM.Authentication.DataAccess
{
    public class AuthenticationDbContext(
        DbContextOptions<AuthenticationDbContext> options) : IdentityDbContext<User>(options)
    {
    }
}
