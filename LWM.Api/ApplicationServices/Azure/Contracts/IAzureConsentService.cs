namespace LWM.Api.ApplicationServices.Azure.Contracts
{
    public interface IAzureConsentService
    {
        Uri GetConsentUri(string baseUrl, bool forceLogin = false);
    }
}