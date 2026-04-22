import type {Response} from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import {db} from "../db/connection.ts"
import {habits,entries,habitTags,tags} from "../db/schema.ts"
import {eq, and, desc, inArray} from 'drizzle-orm'

export const createHabit = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try{
const {name, description, frequency, targetCount, tagIds} = req.body
    const result = await db.transaction(async (trx)=>{
      const [newHabit] = await trx . insert(habits).values({
       
          userId: req.user.id,
          name,
          description,
          frequency,
          targetCount,
      })
      .returning()
      // If tags are provided, create the associations
      if (tagIds && tagIds.length > 0) {
        const habitTagValues = tagIds.map((tagId: string) => ({
          habitId: newHabit.id,
          tagId,
        }))
        await trx.insert(habitTags).values(habitTagValues)
      }

      return newHabit
    })

    res.status(201).json({
      message: 'Habit created successfully',
      habit: result,
    })
    } catch (error) {
console.error('Create habit error:', error)
    res.status(500).json({ error: 'Failed to create habit' })
    }
} 

export const getUserHabits = async(
    req:AuthenticatedRequest,
    res:Response
)=>{
try{
    const userHabitsWithTags=  await db.query.habits.findMany(
        {
            where:eq(habits.userId,req.user.id),
            with:{
                habitTags:{
                    with:{
                        tag:true,
                    },
                },
            },
            orderBy: [desc(habits.createdAt)],
        },
    )
    const habitsWithTags= userHabitsWithTags.map(habit=>({
        ...habit,
        tags: habit.habitTags.map((ht) => ht.tag),
        habitTags:undefined,
    }))

    res.json({
        habits:habitsWithTags
    })
} catch(e){
console.error("Error in getting habits", e)
res.status(500).json({error:'Failed to create Habit'})
}
}
export const updateHabit = async ( req: AuthenticatedRequest, res: Response )=>{
    try{
        const id = req.params.id
        const {tagIds, ...updates} = req.body 
        
        const result = await db.transaction(async (trx)=>{
            const [updatedHabit] = await trx.update(habits).set({
                ...updates,
                updatedAt: new Date(),
            }).where(and(eq(habits.id, id),eq(habits.userId,req.user.id))) 

            .returning()
            if (!updatedHabit){
                return res.status(401).end()
            }
            if (tagIds !== undefined){
              await trx.delete(habitTags).where(eq(habitTags.habitId,id))
              if (tagIds.length > 0){
                const habitTagValues = tagIds.map(tagId=> ({
                  habitId: id,
                  tagId,
                }))
                await trx.insert(habitTags).values(habitTagValues)
              }
            }
            return updatedHabit
        })
        res.json({
            message:"Habit updated successfully",
            habit:result
        })
    }catch(e){
        console.error('Update habit error',e)
        res.status(500).json({error:'failed to update habit'})
    }
}
