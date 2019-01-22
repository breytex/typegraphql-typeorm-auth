import { Connection } from "typeorm"
import { loginUser } from './../test-utils/loginHelper'

import * as faker from "faker"
import { Login } from "../entity/Session"
import { User } from "../entity/User"
import { gCall } from "../test-utils/gCall"
import { createTypeormConn } from "../typeormConnection"
let conn: Connection
beforeAll(async () => {
    conn = await createTypeormConn({ testing: true })
})
afterAll(async () => {
    await conn.close()
})


const loggedInUserQuery = `
query{
loggedinUser{email}
}
`
const logoutMutation = `mutation{logout}`

describe("Should be able to ", () => {

    it("create a new user and login", async () => {
        const email = faker.internet.email()
        const sessionToken = await loginUser(email)
        const loggedInUserResponse = await gCall({ source: loggedInUserQuery, cookie: sessionToken })

        expect(loggedInUserResponse).toMatchObject({
            "data": {
                "loggedinUser": {
                    "email": email
                }
            }
        })

    })

    it("logout to be working correctly", async () => {
        const email = faker.internet.email()
        const sessionToken = await loginUser(email)

        const result = await gCall({
            source: logoutMutation,
            cookie: sessionToken
        })
        const loggedInUserResponse = await gCall({ source: loggedInUserQuery, cookie: sessionToken })
        expect((loggedInUserResponse as any).errors[0].message).toBe("Access denied! You need to be authorized to perform this action!")
    })
})
