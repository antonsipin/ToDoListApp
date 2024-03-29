import { RequestType, Response, NextFunction } from '../types/index'

export const isAuth = (req: RequestType, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        return next()
    } else {
        console.log('User is not authorized')
        res.status(400).json({ error: 'User is not authorized'})
    }
}

export const userName = (req: RequestType, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        res.locals.userName = req.session.user.name
    }
    next()
}
