const userDestructuring = (user: {
    name: string, 
    accessToken: 
    string, 
    refreshToken: 
    string
}) => {
    return {
        name: user.name,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken
    }
}

export default userDestructuring