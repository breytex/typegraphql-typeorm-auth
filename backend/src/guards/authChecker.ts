import { AuthChecker, Authorized } from "type-graphql"
import { Session } from '../entity/Session'
import { User } from '../entity/User'
import log from '../helpers/log'
import { MyContext } from "../types"

// export const Public = () => Authorized("PUBLIC")

export const authChecker: AuthChecker<MyContext> = async ({ context }, roles) => {

    const cookie = context.request.cookies.freelancertoolsSession
    if (cookie) {
        const session: Session = await Session.findOne({ token: cookie }, { relations: ["user"] })
        if (session) {
            if (session.user) {
                context.user = session.user
                log("user found in cookie:")
                log(session.user.id + " " + session.user.email)

            } else {
                context.user = null
                log("found cookie but no matching user in session table")

            }
        } else {
            log("cookie found, but no matching session")
        }

    } else {
        context.user = null
        log("no cookie in request")
    }

    return (context.user ? true : false)
}