import * as faker from "faker"
import { Connection } from "typeorm"

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

const registerMutation = `
mutation Register($email: String!) {
    requestSignIn(user:{email:$email})
}
`

describe("Request SignIn with ", () => {
    it("new user", async () => {
        const email = faker.internet.email()
        const response = await gCall({
            source: registerMutation,
            variableValues: {
                email,
            }
        })

        expect(response).toMatchObject({ "data": { "requestSignIn": true } })

        const dbUser = await User.findOne({ where: { email } })
        expect(dbUser).toBeDefined()
    })
})
