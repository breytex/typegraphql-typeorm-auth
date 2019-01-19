import { Arg, Ctx, Mutation, Query } from "type-graphql"
import { Todo } from './../entity/Todo'
import { MyContext } from './../types'

export class TodoResolver {
  @Query(returns => [Todo])
  async todos(@Ctx() { user }: MyContext) {
    return await Todo.find({ user })
  }

  @Query(returns => Todo)
  async todo(@Arg("id") id: string, @Ctx() { user }: MyContext) {
    const todo = await Todo.findOne({ id, user }) // restricting access to todo's which belong to the loggedIn user
    if (todo) {
      return todo
    } else {
      throw Error("notFound")
    }
  }

  @Mutation(returns => Boolean)
  async createTodo(@Arg("text") text: string, @Ctx() { user }: MyContext) {
    const todo = await Todo.create({ text, user })
    await todo.save()
    return true
  }
}
