namespace LWM.Authentication
{
    public class JTWResponseToken
    {
        public string ID { get; set; }
        public string Auth_Token { get; set; }
        public int Expires_In { get; set; }
    }
}
