import { MaxLength } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { MyEntity } from './Entity'
import { User } from './User'

@ObjectType()
@Entity()
export class Todo extends MyEntity {
    @Field()
    @Column()
    text: string

    @OneToOne(type => User)
    @JoinColumn()
    owner: User
}

@InputType()
export class TodoInput {
    @Field()
    @MaxLength(30)
    text: string
}
