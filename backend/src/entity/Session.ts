import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Generated } from 'typeorm'
import { Column } from 'typeorm'
import { MyEntity } from "./Entity"
import { OwnerEntity, User } from './User'

abstract class TokenData extends OwnerEntity {
    @Column()
    @Generated("uuid")
    token: string
}

@Entity()
export class Session extends TokenData { }

@Entity()
export class Login extends TokenData { }