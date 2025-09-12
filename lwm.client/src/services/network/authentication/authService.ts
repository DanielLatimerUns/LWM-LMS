import {LoginModel} from '../../../entities/app/loginModel';
import LoginResponseModel from '../../../entities/app/loginResponseModel';
import ResetService from '../RestService';

export default class AuthService {

    private static get AuthTokenKey() : string { return "LWM_AUTH_TOKEN"}

    public static async Login(loginModel: LoginModel | undefined): Promise<boolean> {
        const cachedToken = this.TryGetCachedAuthToken();

        if (cachedToken && !loginModel) { return true; }

        const response = await ResetService.Post("auth", loginModel);

        if (!response.ok) { return false; }

        this.SaveTokenToCache(await response.json())

        return true;
    }

    public static async Logout() {
        localStorage.removeItem(this.AuthTokenKey);
    }

    public static GetCurrentUser(): LoginResponseModel | undefined {
        return this.TryGetCachedAuthToken();
    }

    public static isLoggedIn(): boolean {
        return this.TryGetCachedAuthToken() !== undefined;
    }

    private static TryGetCachedAuthToken(): LoginResponseModel | undefined {
        const cachedToken = localStorage.getItem(this.AuthTokenKey);
        if (!cachedToken) {return undefined;}
        return JSON.parse(cachedToken);
    }

    private static SaveTokenToCache(token: LoginResponseModel) {
        localStorage.setItem(this.AuthTokenKey, JSON.stringify(token));
    }
}