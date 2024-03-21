using System.Net;

namespace LWM.Api.Framework.Exceptions
{
    public class InvalidAzureUserException
        (string message) : BaseException(HttpStatusCode.Forbidden, message)
    {
    }
}
