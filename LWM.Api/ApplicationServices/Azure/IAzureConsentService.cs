
namespace LWM.Api.ApplicationServices.Azure
{
    public interface IAzureConsentService
    {
        Uri GetConsentUri();
        Task HandleConsentResponse(string code);

        bool RequiresConsent();
    }
}