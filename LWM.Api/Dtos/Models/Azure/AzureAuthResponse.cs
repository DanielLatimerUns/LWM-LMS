using System.Text.Json.Serialization;

namespace LWM.Api.Dtos.Models.Azure
{
    public class AzureAuthResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }

        public string Scope { get; set; }

        [JsonPropertyName("id_token")]
        public string IdToken { get; set; }
    }
}
