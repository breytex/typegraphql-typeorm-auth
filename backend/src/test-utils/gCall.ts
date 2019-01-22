import { graphql, GraphQLSchema } from "graphql"
import Maybe from "graphql/tsutils/Maybe"
import { SESSION_COOKIE_NAME } from './../resolvers/Session'

import { createSchema } from "../utils/createSchema"

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any;
  }>
  userId?: number
  cookie?: string
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, cookie }: Options) => {
  if (!schema) {
    schema = await createSchema()
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      request: {
        cookies: { [SESSION_COOKIE_NAME]: cookie }
      },
      response: {
        clearCookie: jest.fn(),
        cookie: jest.fn()
      }
    }
  })
}
