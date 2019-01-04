import { ObjectType,InputType, Field, ID } from 'type-graphql'
import { MaxLength } from 'class-validator';

@ObjectType()
export class User {
    @Field(type => ID)
    id: string
    
    @Field()
    email: string
    
    @Field()
    createdAt: Date
}

@InputType()
export class UserInput {
    @Field()
    @MaxLength(30)
    email: string;
}
