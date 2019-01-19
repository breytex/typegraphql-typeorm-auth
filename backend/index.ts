import cookieParser = require('cookie-parser')
import { GraphQLServer } from 'graphql-yoga'
import { Context } from 'graphql-yoga/dist/types'
import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import { authChecker } from './src/guards/authChecker'
import { CookieAuthMiddleware } from './src/middlewares/cookieAuth'
import { resolvers } from './src/resolvers'
import { createTypeormConn } from './src/typeormConnection'
import { MyContext } from './src/types'

(async () => {

  await createTypeormConn()

  const schema = await buildSchema({
    resolvers,
    authChecker,
    globalMiddlewares: [CookieAuthMiddleware]
  })

  const server = new GraphQLServer({
    context: ({ response, request }: Context): MyContext => {
      return {
        response,
        request,
        user: null,
        public: false
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

  server.start(opts, () => console.log('Server is running on http://localhost:4000'))

})().catch(e => { console.error(e) })

