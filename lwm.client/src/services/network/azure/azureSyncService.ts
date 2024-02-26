import RestService from '../RestService';
import AzureAuthService from "../azure/azureAuthService";

const azureSyncService = () => {
    function attemptFullSync(): Promise<Response> {

        const token = AzureAuthService.getCachedAuthToken();

        if (!token) {
            return Promise.reject();
        }

        return RestService.Put('azure/import', undefined);
    }

    return ({attemptFullSync});
}

export default azureSyncService();