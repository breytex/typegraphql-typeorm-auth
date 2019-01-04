import { Query, Arg, Mutation } from "type-graphql";
import  { UserInput, User } from "../entity/User";

export class UserResolver{
  @Query(returns => User)
  async user(@Arg("id") id: string) {
    throw Error("not implemented yet")
  }
  
  @Mutation(returns => User)
  async addUser(@Arg("user") { email }: UserInput){
    const user = await User.create({ email })
    console.log(user)
    return user
  }
}
