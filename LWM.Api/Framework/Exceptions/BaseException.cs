using System.Net;

namespace LWM.Api.Framework.Exceptions
{
    public class BaseException(HttpStatusCode statusCode, string message) : Exception(message)
    {
        public HttpStatusCode StatusCode = statusCode;
    }
}
