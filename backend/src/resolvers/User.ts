import { Query, Arg, Mutation } from "type-graphql";
import { UserInput, User } from "../entity/User";

export class UserResolver {
  @Query(returns => User)
  async user(@Arg("id") id: string) {
    return await User.findOne({ id })
  }

  @Mutation(returns => User)
  async addUser(@Arg("user") { email }: UserInput) {
    const user = User.create({ email })
    await user.save()
    return user
  }
}
