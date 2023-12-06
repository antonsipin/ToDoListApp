const userDestructuring = (user) => {
    return {
        name: user.name,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken
    }
}

export default userDestructuring