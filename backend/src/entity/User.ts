import { ObjectType, InputType, Field, ID } from 'type-graphql'
import { MaxLength, IsEmail } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, Generated } from "typeorm"

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    @IsEmail()
    email: string

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date
}

@InputType()
export class UserInput {
    @Field()
    @MaxLength(30)
    email: string;
}
