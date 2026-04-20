import {db} from './connection.ts'
import { users,habits,entries,tags,habitTags } from './schema.ts'

const seed = async () =>{
    console.log('seed started');
    try {
        console.log('Clearing existing data ')

        // Clear tables in reverse order of dependencies (entries -> habits -> users, etc.)
        await db.delete(entries);
        await db.delete(habitTags);
        await db.delete(habits);
        await db.delete(tags);
        await db.delete(users);
        console.log('creating demo users')
    

    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@habittracker.com',
        username: 'demouser',
        password: 'hashedPassword',
        firstName: 'Demo',
        lastName: 'User',
      })
      .returning()
      console.log('Creating tags...')
    const [healthTag] = await db
      .insert(tags)
      .values({ name: 'Health', color: '#10B981' })
      .returning()

      const [exerciseHabit] = await db.insert(habits).values({
        userId: demoUser.id,
        name: 'Exercise',
        description: '30 minutes of exercise',
        frequency: 'daily workoout',
        targetCount: 1,
        isActive: true,
      }).returning()

      await db.insert(habitTags).values({
        habitId: exerciseHabit.id,
        tagId: healthTag.id,
      })

      console.log('Adding completion entries')
      const today = new Date()
      today.setHours(12,0,0,0)
      for (let i=0; i<7; i++){
        const date = new Date(today)
        date.setDate(today.getDate() -i)
        await db.insert(entries).values({
          habitId: exerciseHabit.id,
          completionDate: date,
          note: `Completed on ${date.toDateString()}`,
        })
      }

      console.log("seed completed successfully")
      console.log('user credentials')
      console.log(`email: ${demoUser.email} `)
      console.log(`username: ${demoUser.username}`)
      console.log(`password: [PASSWORD]`

                                                                                      )
    }catch(error){
       console.log('seed failed',error)
       throw error
    }
    
    
}
seed().catch(err => {
    console.error(err);
    process.exit(1);
})
export default seed