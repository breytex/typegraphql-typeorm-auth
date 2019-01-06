import { Arg, Mutation, Query } from "type-graphql"
import { User, UserInput } from "../entity/User"

export class UserResolver {
  @Query(returns => User)
  async user(@Arg("id") id: string) {
    return await User.findOne({ id })
  }
}
