using LWM.Api.Framework.Entities;

namespace LWM.Api.Framework.Services
{
    public interface IApplicationInstanceService
    {
        RequestState GetRequestState();
        void SetRequestState(RequestState requestState);
    }
}
