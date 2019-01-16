import cookieParser = require('cookie-parser')
import { Request, Response } from 'express'
import { GraphQLServer } from 'graphql-yoga'
import { Context } from 'graphql-yoga/dist/types'
import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import { Connection, createConnection } from "typeorm"
import { User } from './src/entity/User'
import cookieAuth from './src/middlewares/cookieAuth'
import { resolvers } from './src/resolvers'
import { createTypeormConn } from './src/typeormConnection'
import { Context as MyContext } from './src/types'
(async () => {

  await createTypeormConn()

  const schema = await buildSchema({
    resolvers,
  })

  const server = new GraphQLServer({
    context: ({ response, request }: Context): MyContext => {
      return {
        response,
        request
      }
    },
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

