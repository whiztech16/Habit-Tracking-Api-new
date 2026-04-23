import {drizzle } from "drizzle-orm/node-postgres"
import {Pool} from "pg"
import * as schema from "./schema.ts"
import {env, isProd} from '../../env.ts'
import { remember } from "@epic-web/remember"


const createPool = () => {
    return new Pool({
        connectionString: env.DATABASE_URL,
    })
}


export const client = isProd() ? createPool() : remember("dbpool", () => createPool())

export const db = drizzle({client,schema})
export default db
