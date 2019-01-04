import { Query, Arg, Mutation } from "type-graphql";
import  { UserInput, User } from "../types/User";

export class UserResolver{
  @Query(returns => User)
  async user(@Arg("id") id: string) {
    throw Error("not implemented yet")
  }
  
  @Mutation(returns => Boolean)
  async addUser(@Arg("email") { email }: UserInput) {
    throw Error("not implemented yet")
  }
}
