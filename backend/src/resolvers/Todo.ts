import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql"
import { User, UserInput } from "../entity/User"
import { Todo } from './../entity/Todo'
import { MyContext } from './../types'

export class TodoResolver {
  @Query(returns => User)
  async user(@Arg("id") id: string) {
    return await User.findOne({ id })
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async createTodo(@Arg("text") text: string, @Ctx() { request }: MyContext) {
    const todo = await Todo.create({ text, owner: request.user })
    await todo.save()
    return true
  }
}
