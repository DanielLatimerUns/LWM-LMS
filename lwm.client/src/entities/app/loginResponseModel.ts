import { User } from "./User.ts";

export default interface LoginResponseModel {
    token: {
        auth_Token: string,
        expires_In: string
        id: string
    },
    user: User
}