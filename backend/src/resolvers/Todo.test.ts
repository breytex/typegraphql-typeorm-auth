import { Connection } from "typeorm"
import { loginUser } from '../test-utils/loginHelper'

import * as faker from "faker"
import { gCall } from "../test-utils/gCall"
import { createTypeormConn } from "../typeormConnection"

let conn: Connection
beforeAll(async () => {
    conn = await createTypeormConn({ testing: true })
})
afterAll(async () => {
    await conn.close()
})


const createTodoMutation = `
mutation CreateTodo($text: String!) {
    createTodo(text:$text)
}
`

describe("Should be able to ", () => {

    it("create a todo when logged-in", async () => {
        const email = faker.internet.email()
        const sessionToken = await loginUser(email)
        const text = faker.lorem.sentence()
        const createTodoResponse = await gCall({
            source: createTodoMutation, cookie: sessionToken,
            variableValues: {
                text,
            }
        })

        expect(createTodoResponse).toMatchObject(
            {
                "data": {
                    "createTodo": true
                }
            }
        )

    })

    it("not create a todo when not logged-in", async () => {
        const text = faker.lorem.sentence()
        const createTodoResponse = await gCall({
            source: createTodoMutation,
            variableValues: {
                text,
            }
        })

        expect((createTodoResponse as any).errors[0].message).toBe("Access denied! You need to be authorized to perform this action!")
    })


})
