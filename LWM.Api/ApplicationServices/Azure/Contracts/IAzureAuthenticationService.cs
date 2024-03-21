using LWM.Api.Dtos.Azure;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.ApplicationServices.Azure.Contracts
{
    public interface IAzureAuthenticationService
    {
        Task<AzureAuthResponse> GetAuthTokenForCodeAsync(string code, string host);

        Task<IActionResult> HandleAuthResponseRedirect(string code, string hostUrl);
    }
}