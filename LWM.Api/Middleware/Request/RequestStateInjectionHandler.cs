using LWM.Api.Framework.Services;

namespace LWM.Api.Middleware.Request
{
    public class RequestStateInjectionHandler(RequestDelegate next)
    {
        public async Task Invoke(
            HttpContext context, 
            IApplicationInstanceService applicationInstanceService)
        {
            if (context.Request.Headers.TryGetValue("AZURE_TOKEN", out var value))
            {
                var token = value[0];

                applicationInstanceService.SetRequestState(
                    new Framework.Entities.RequestState(token));
            }

            await next(context);
        }
    }
}
