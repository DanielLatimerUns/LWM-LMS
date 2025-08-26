using LWM.Authentication;
using LWM.Authentication.Dtos;

namespace LWM.Api.Dtos.ViewModels
{
    public class LoginResponseViewModel
    {
        public JTWResponseToken Token { get; set; }
        
        public UserModel User { get; set; }
    }
}
