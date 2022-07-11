export interface IUser {
    email: string
    password: string
    user_id: number
    role: string
    isActivated: boolean
}

export interface IAuthUserData {
    email: string
    password: string
}

export interface IAuthResponse {
    refreshToken: string
    accessToken: string
    user: IUser
}