
import { createConnection, getConnectionOptions } from "typeorm"
import log from "./helpers/log"

export const createTypeormConn = async () => {
  let retries = 5
  while (retries) {
    try {
      const options = await getConnectionOptions(process.env.NODE_ENV)
      return createConnection({ ...options, name: "default" })
    } catch (err) {
      log(err)
      retries -= 1
      log(`retries left: ${retries}`)
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000))
    }
  }

  return null
}