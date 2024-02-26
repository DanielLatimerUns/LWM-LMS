namespace LWM.Api.Framework.Entities
{
    public class RequestState(string azureAuthToken)
    {
        public string AzureAuthToken { get { return azureAuthToken; } }
    }
}
