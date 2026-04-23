import dotenv from 'dotenv';
import path from 'path';
import { db, client } from '../../src/db/connection.ts'

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') }); // must be before any db imports


import { users, habits, entries, tags, habitTags } from "../../src/db/schema.ts";
import { sql } from 'drizzle-orm';
import { execSync } from 'child_process';

export default async function setup() {
  console.log('🗄️  Setting up test database...')

  try {
    await db.execute(sql`DROP TABLE IF EXISTS habit_tags CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS entries CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS habits CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS tags CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`)

    console.log('Pushing schema using drizzle-kit...')
    execSync(
      `npx drizzle-kit push --force --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="postgresql"`,
      { stdio: 'inherit', cwd: process.cwd() }
    )

    console.log('✅ Test database setup complete')
  } catch (error) {
    console.error('❌ Failed to setup test database:', error)
    throw error
  }

  return async () => {
  console.log('🧹 Tearing down test database...')
  try {
    await db.execute(sql`DROP TABLE IF EXISTS habit_tags CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS entries CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS habits CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS tags CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`)
    console.log('✅ Test database teardown complete')
  } catch (error) {
    console.error('❌ Failed to teardown test database:', error)
  } finally {
    await client.end() // closes the pg pool
  }
}
}