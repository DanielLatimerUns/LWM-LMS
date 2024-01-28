using LWM.Api.Dtos.DomainEntities;
using LWM.Authentication;
using LWM.Web.ViewModels;

namespace LWM.Api.Dtos.ViewModels
{
    public class LoginResponseViewModel
    {
        public JTWResponseToken Token { get; set; }

        public Person Person { get; set; }

        public UserViewModel User { get; set; }
    }
}
