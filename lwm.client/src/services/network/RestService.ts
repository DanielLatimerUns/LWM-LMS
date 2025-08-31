import AuthService from './authentication/authService';
import azureAuthService from './azure/azureAuthService';

export default class RestService {
    //https://localhost:7120/ local dev - this should use env var later on
    //https://7techsolutions.net/api/ prod
    private static get BaseApiUrl() : string { return 'api/'}

    public static Get(requestUrl: string) : Promise<Response> {
        return fetch(this.BaseApiUrl + requestUrl, {
            headers: {
                "Authorization": 'Bearer ' + this.BuildAuthHeader().Authorization,
                "AZURE_TOKEN": azureAuthService.getCachedAuthToken()?.token ?? ''
            }
        });
    }

    public static GetWithType<t>(requestUrl: string) : Promise<t> {
        return fetch(this.BaseApiUrl + requestUrl, {
            headers: {
                "Authorization": 'Bearer ' + this.BuildAuthHeader().Authorization,
                "AZURE_TOKEN": azureAuthService.getCachedAuthToken()?.token ?? ''
            }
        }).then(response => response.json().then(data => data as t));
    }

    public static Post(requestUrl: string, payload: any) : Promise<Response> {
        const authHeader = this.BuildAuthHeader().Authorization;
        return fetch(this.BaseApiUrl + requestUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + authHeader,
                "AZURE_TOKEN": azureAuthService.getCachedAuthToken()?.token ?? ''
            },
            body: JSON.stringify(payload),
        });
    }

    public static PostForm(requestUrl: string, form: FormData) : Promise<Response> {
        const authHeader = this.BuildAuthHeader().Authorization;
        return fetch(this.BaseApiUrl + requestUrl, {
            method: 'post',
            headers: {
                "Authorization": "Bearer " + authHeader,
                "AZURE_TOKEN": azureAuthService.getCachedAuthToken()?.token ?? ''
            },
            body: form,
        });
    }

    public static Put(requestUrl: string, payload: any) : Promise<Response> {
        const authHeader = this.BuildAuthHeader().Authorization;
        return fetch(this.BaseApiUrl + requestUrl, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + authHeader,
                "AZURE_TOKEN": azureAuthService.getCachedAuthToken()?.token ?? ''
            },
            body: payload ? JSON.stringify(payload) : ''
        });
    }

    public static Delete(requestUrl: string) : Promise<Response> {
        const authHeader = this.BuildAuthHeader().Authorization;
        return fetch(this.BaseApiUrl + requestUrl, { method: 'delete', headers: {'Authorization': 'Bearer ' + authHeader}});
    }

    private static BuildAuthHeader() {
        const bearer = AuthService.GetCurrentUser();
        if (!bearer) { return { 'Authorization': '' }}

        return { 'Authorization':  bearer.token.auth_Token};
    }

}