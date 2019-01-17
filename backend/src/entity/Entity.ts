import { Field, ID } from 'type-graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity, Generated, JoinColumn, OneToOne } from 'typeorm'
import { User } from './User'
export abstract class MyEntity extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @Field()
    @UpdateDateColumn({ type: "timestamp" })
    changedAt: Date
}