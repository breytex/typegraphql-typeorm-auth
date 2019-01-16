import { Response } from 'express'
import { Request } from 'express'
import { User } from './entity/User'

declare module 'express' {
    interface Request {
        user?: User
    }
}

export interface Context {
    request: Request
    response: Response
}