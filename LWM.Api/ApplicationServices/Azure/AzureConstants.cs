namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureConstants
    {
        public static readonly string[] Scopes =
        [
            "openid",
            "profile",
            "email",
            "offline_access",
            "https://graph.microsoft.com/Files.ReadWrite.All"
        ];
    }
}
