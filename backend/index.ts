import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './resolvers'


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  debug: true,
} as any)

const opts = {
  port: 4000,
  endpoint: '/api',
  subscriptions: '/api/subscriptions',
  playground: '/api/playground',
}

server.express.enable('trust proxy')


server.start(opts, () => console.log('Server is running on http://localhost:4000'))
