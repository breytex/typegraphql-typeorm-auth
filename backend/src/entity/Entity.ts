import { Field, ID } from 'type-graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm'

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