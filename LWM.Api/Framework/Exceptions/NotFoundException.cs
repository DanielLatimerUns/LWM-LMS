using System.Net;

namespace LWM.Api.Framework.Exceptions
{
    public class NotFoundException(string message) : BaseException(HttpStatusCode.NotFound, message)
    {
    }
}
