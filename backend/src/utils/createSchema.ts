import { buildSchema } from 'type-graphql'
import { authChecker } from '../guards/authChecker'
import { resolvers } from '../resolvers'

export const createSchema = () => buildSchema({
    resolvers,
    authChecker,
})