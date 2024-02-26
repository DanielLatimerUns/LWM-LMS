import moment from "moment";
import AzureAuthToken from "../../../entities/azure/azureAuthToken"
import RestService from "../RestService";

const azureAuthService = () => {

    const cacheKey = 'azure_token';

    function getCachedAuthToken(): AzureAuthToken | undefined {
        const cachedToken = localStorage.getItem(cacheKey);
        if (cachedToken !== null) {
            const parsedCachedToken = JSON.parse(cachedToken) as AzureAuthToken;

            if (moment() > moment(parsedCachedToken.cachedAt).add(1800, 'seconds')) {
                localStorage.removeItem(cacheKey);
                return undefined;
            }

            return parsedCachedToken;
        }

        return undefined;
    }

    function cacheAuthToken(token: string) {
        if(!token) { return; }

        localStorage.setItem(cacheKey, JSON.stringify({ token: token, cached: moment()}));
    }

    function redirectToAzureUserAuth() {
        RestService.Get('azure/consent').then(
            data => data.text().then(
                consentUrl => window.location.assign(consentUrl)
            )
        );
    }

    return ({getCachedAuthToken, cacheAuthToken, redirectToAzureUserAuth});
}

export default azureAuthService();

