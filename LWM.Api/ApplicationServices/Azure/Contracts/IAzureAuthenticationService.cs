﻿using LWM.Api.Dtos.Azure;

namespace LWM.Api.ApplicationServices.Azure.Contracts
{
    public interface IAzureAuthenticationService
    {
        Task<AzureAuthResponse> GetAuthTokenForCodeAsync(string code);
    }
}