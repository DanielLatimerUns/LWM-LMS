export default class RestService {

    private static get BaseApiUrl() : string { return 'https://lwm.local/Api/'}

    public static Get(requestUrl: string) : Promise<Response> {
        return fetch(this.BaseApiUrl + requestUrl)
    }

    public static Post(requestUrl: string, payload: any) : Promise<Response> {       
        return fetch(this.BaseApiUrl + requestUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    public static Put(requestUrl: string, payload: any) : Promise<Response> {       
        return fetch(this.BaseApiUrl + requestUrl, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload ? JSON.stringify(payload) : ""
        });
    }

    public static Delete(requestUrl: string) : Promise<Response> {
        return fetch(this.BaseApiUrl + requestUrl, { method: "delete" });
    }
}