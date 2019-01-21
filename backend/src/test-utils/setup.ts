import { createTypeormConn } from "../typeormConnection"

createTypeormConn({ testing: true, dropTables: true }).then(() => process.exit())
