import { ArgumentValidationError, MiddlewareInterface, NextFn, ResolverData } from "type-graphql"
import { Service } from "typedi"
import { Session } from '../entity/Session'
import { User } from '../entity/User'
import log from '../helpers/log'
import { MyContext } from '../types'

@Service()
export class CookieAuthMiddleware implements MiddlewareInterface<MyContext> {
    async use({ context, info }: ResolverData<MyContext>, next: NextFn) {

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

        if (context.public || context.user) {
            await next()
        } else {
            throw Error("accessDenied")
        }
    }
}
