import { Request, Response } from "express"
import log from "../helpers/log"
import { Session } from './../entity/Session'
import { User } from './../entity/User'

export default async (req: Request, res: Response, next: Function) => {
    console.log(req.cookies)
    const cookie = req.cookies.freelancertoolsSession
    if (cookie) {
        const session: Session = await Session.findOne({ token: cookie }, { relations: ["user"] })
        if (session) {
            if (session.user) {
                req.user = session.user
                log("user found in cookie:")
                log(session.user.id + " " + session.user.email)

            } else {
                req.user = null
                log("found cookie but no matching user in session table")

            }
        } else {
            log("cookie found, but no matching session")
        }

    } else {
        req.user = null
        log("no cookie in request")
    }
    next()
} 