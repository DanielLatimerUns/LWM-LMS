using LWM.Api.Dtos.DomainEntities;
using LWM.Authentication;
using LWM.Web.ViewModels;

namespace LWM.Api.Dtos.ViewModels
{
    public class LoginResponseViewModel
    {
        public JTWResponseToken Token { get; set; }
    }
}
