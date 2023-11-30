export type UserState = {
    user: {
        name: string
        accessToken: string
        refreshToken: string
    },
    error: string
}