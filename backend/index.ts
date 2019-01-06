import cookieParser = require('cookie-parser')
import { GraphQLServer } from 'graphql-yoga'
import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import { Connection, createConnection } from "typeorm"
import { User } from './src/entity/User'
import cookieAuth from './src/middlewares/cookieAuth'
import { resolvers } from './src/resolvers'
import { createTypeormConn } from './src/typeormConnection'
(async () => {

  await createTypeormConn()

  const schema = await buildSchema({
    resolvers
  })

  const server = new GraphQLServer({
    context: (req: any) => ({
      ...req
    }),
    schema,
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

  server.express.use(cookieParser())
  server.express.use(cookieAuth)

  server.start(opts, () => console.log('Server is running on http://localhost:4000'))

})().catch(e => { console.error(e) })

