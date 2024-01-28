export default interface LoginResponseModel {
    token: {
        auth_Token: string,
        expires_In: string
        id: string
    }
}