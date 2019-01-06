import { IsEmail, MaxLength } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Column, Entity } from "typeorm"
import { MyEntity } from './Entity'

@ObjectType()
@Entity()
export class User extends MyEntity {
    @Field()
    @Column()
    @IsEmail()
    email: string
}

@InputType()
export class UserInput {
    @Field()
    @MaxLength(30)
    email: string
}
