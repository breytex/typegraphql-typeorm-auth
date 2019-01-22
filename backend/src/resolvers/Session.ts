import { Context } from 'graphql-yoga/dist/types'
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql"
import { User, UserInput } from "../entity/User"
import { checkIfNotExpired } from "../helpers/date"
import log from "../helpers/log"
import { Login, Session } from './../entity/Session'
import { MyContext } from './../types'

export const SESSION_COOKIE_NAME = "freelancertoolsSession"
export class SessionResolver {
    @Authorized()
    @Query(returns => User)
    async loggedinUser(@Ctx() { user }: MyContext) {
        if (!user) {
            throw Error("noUserLoggedin")
        }
        return user
    }

    @Mutation(returns => Boolean)
    async requestSignIn(@Arg("user") { email }: UserInput) {
        let user: User = await User.findOne({ where: { email } })
        // create user if not existent
        if (!user) {
            user = User.create({ email })
            user = await user.save()
        }

        // removing old login attempts 
        const oldLogins = await Login.find({ where: { user } })
        await Login.remove(oldLogins)

        // create new login token 
        let login = await Login.create({ user })
        login = await login.save()

        log("sign in using this token: \r\n" + login.token, { lines: true })
        return true
    }

    @Mutation(returns => String)
    async signIn(@Arg("token") token: string, @Ctx() { response }: MyContext) {
        const login: Login = await Login.findOne({ token }, { relations: ["user"] })
        if (login && checkIfNotExpired(login.createdAt, 10)) {
            const user: User = login.user
            const oldLogins = await Login.find({ where: { user } })
            oldLogins.forEach(async e => { await e.remove() })

            let session = await Session.create({ user })
            session = await session.save()
            response.cookie(SESSION_COOKIE_NAME, session.token, { maxAge: 2592000, httpOnly: false })
            return session.token
        } else {
            throw new Error("invalid-token")
        }
    }

    @Authorized()
    @Mutation(returns => Boolean)
    async logout(@Ctx() { request, response, user }: MyContext) {
        if (user) {
            const token = request.cookies.freelancertoolsSession
            Session.delete({ token })
            response.clearCookie(SESSION_COOKIE_NAME)
            return true
        }
        return false
    }

}
