using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Authentication.Dtos
{
    public class LoginResponse
    {
        public string Token { get; set; }

        public bool IsSuccss { get; set; }
    }
}
