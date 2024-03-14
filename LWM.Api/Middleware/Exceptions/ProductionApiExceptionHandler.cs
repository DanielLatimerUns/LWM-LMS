using LWM.Api.Framework.Exceptions;
using System.Net;

namespace LWM.Api.Middleware.Exceptions
{
    public class ProductionApiExceptionHandler : ApiExceptionHandlerBase
    {
        public ProductionApiExceptionHandler(RequestDelegate next) : base(next)
        {
            
        }

        public override (HttpStatusCode code, string message) GetResponse(Exception exception)
        {
            if (exception is BaseException)
            {
                var customException = (BaseException)exception;

                return (customException.StatusCode, customException.Message);
            }

            return (
                HttpStatusCode.InternalServerError, 
                $"Exception: {exception.Message} - {exception.StackTrace} Inner Exception: {exception.InnerException?.Message} - {exception.InnerException?.StackTrace}");
        }
    }
}
