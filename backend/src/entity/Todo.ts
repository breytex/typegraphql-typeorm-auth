import { MaxLength } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { MyEntity } from './Entity'
import { OwnerEntity, User } from './User'

@ObjectType()
@Entity()
export class Todo extends OwnerEntity {
    @Field()
    @Column()
    text: string
}

@InputType()
export class TodoInput {
    @Field()
    @MaxLength(30)
    text: string
}
