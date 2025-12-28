import jwt from 'jsonwebtoken'

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
*/
export const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        const id = verifiedToken.id
        req[user] = id
        next()
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(400).json({
                message: 'Token expired'
            })
        } else {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    }
}