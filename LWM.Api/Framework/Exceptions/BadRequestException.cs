using System.Net;

namespace LWM.Api.Framework.Exceptions
{
    public class BadRequestException(string message) : BaseException(HttpStatusCode.BadRequest, message)
    {
    }
}
