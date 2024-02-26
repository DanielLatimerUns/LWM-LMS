using LWM.Api.Framework.Entities;

namespace LWM.Api.Framework.Services
{
    public class ApplicationInstanceService : IApplicationInstanceService
    {
        private RequestState _requestState { get; set; }

        public RequestState GetRequestState()
        {
            return _requestState;
        }

        public void SetRequestState(RequestState requestState)
        {
            _requestState = requestState;
        }
    }
}
