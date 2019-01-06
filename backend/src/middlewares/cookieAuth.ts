import { Request, Response } from "express"
import log from "../helpers/log"
import { Session } from './../entity/Session'
import { User } from './../entity/User'

declare module 'express' {
    interface Request {
        user?: User
    }
}

export default async (req: Request, res: Response, next: Function) => {
    const cookie = req.cookies.freelancertoolsSession
    if (cookie) {
        const user: User = (await Session.findOne({ token: cookie })).user
        if (user) {
            req.user = user
            log("user found in cookie:")
            log(user.id + " " + user.email)

        } else {
            req.user = null
            log("found cookie but no matching user in session table")

        }
    } else {
        req.user = null
        log("no cookie in request")
    }
    next()
} 