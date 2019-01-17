import { AuthChecker } from "type-graphql"
import log from "../helpers/log"
import { MyContext } from "../types"


// create auth checker function
export const authChecker: AuthChecker<MyContext> = ({ context: { request } }, roles) => {
    if (request.user) {
        log("user authorized")
        return true
    }
    log("NOT authorized")
    return false
}