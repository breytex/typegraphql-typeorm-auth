import { Arg, Mutation, Query } from "type-graphql"
import { User, UserInput } from "../entity/User"
import { checkIfNotExpired } from "../helpers/date"
import log from "../helpers/log"
import { Login, Session } from './../entity/Session'

export class SessionResolver {
    @Query(returns => User)
    async loggedinUser() {
        // return await User.findOne({ id })
        throw new Error("not implemented")
    }

    @Mutation(returns => Boolean)
    async requestSignIn(@Arg("user") { email }: UserInput) {
        let user: User = await User.findOne({ where: { email } })
        console.log(user)
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
    async signIn(@Arg("token") token: string, ...params) {
        console.log(params)
        const login: Login = await Login.findOne({ token })
        if (login && checkIfNotExpired(login.createdAt, 10)) {
            const user: User = login.user
            const oldLogins = await Login.find({ where: { user } })
            await Login.remove(oldLogins)

            let session = await Session.create({ user })
            session = await session.save()
            // response.cookie('freelancertoolsSession', session.token, { maxAge: 2592000, httpOnly: false })
            return session.token
        } else {
            throw new Error("invalid-token")
        }
    }
}
