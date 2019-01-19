import { AuthChecker, Authorized } from "type-graphql"
import { MyContext } from "../types"

export const Public = () => Authorized("PUBLIC")

export const authChecker: AuthChecker<MyContext> = ({ context }, roles) => {
    if (roles.includes("PUBLIC")) {
        context.public = true
    }
    return true

}