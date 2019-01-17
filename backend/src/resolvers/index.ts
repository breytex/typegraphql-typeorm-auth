import { SessionResolver } from './Session'
import { TodoResolver } from './Todo'
import { UserResolver } from "./User"

export const resolvers = [UserResolver, SessionResolver, TodoResolver]
