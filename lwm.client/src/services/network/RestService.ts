import AuthService from './authentication/authService';

export default class RestService {
    //https://localhost:7120/ local dev - this should use env var later on
    //https://7techsolutions.net/api/ prod
    private static get BaseApiUrl() : string { return 'https://localhost:7120/'}

    public static Get(requestUrl: string) : Promise<Response> {
        return fetch(this.BaseApiUrl + requestUrl, {
            headers: {"Authorization": "Bearer " + this.BuildAuthHeader().Authorization}
        });
    }

    public static Post(requestUrl: string, payload: any) : Promise<Response> {   
        const authHeader = this.BuildAuthHeader().Authorization;    
        return fetch(this.BaseApiUrl + requestUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + authHeader
            },
            body: JSON.stringify(payload)
        });
    }

    public static Put(requestUrl: string, payload: any) : Promise<Response> {     
        const authHeader = this.BuildAuthHeader().Authorization;    
        return fetch(this.BaseApiUrl + requestUrl, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + authHeader
            },
            body: payload ? JSON.stringify(payload) : ""
        });
    }

    public static Delete(requestUrl: string) : Promise<Response> {
        const authHeader = this.BuildAuthHeader().Authorization;  
        return fetch(this.BaseApiUrl + requestUrl, { method: "delete", headers: {"Authorization": "Bearer " + authHeader}});
    }

    private static BuildAuthHeader() {
        const bearer = AuthService.GetAuthToken();
        if (!bearer) { return { 'Authorization': "" }}

        return { 'Authorization':  bearer.token.auth_Token};
    }
}