import { Entity } from 'typeorm'
import { Generated, JoinColumn, OneToOne } from 'typeorm'
import { Column } from 'typeorm'
import { MyEntity } from "./Entity"
import { User } from './User'

abstract class TokenData extends MyEntity {
    @OneToOne(type => User)
    @JoinColumn()
    user: User

    @Column()
    @Generated("uuid")
    token: string
}

@Entity()
export class Session extends TokenData { }

@Entity()
export class Login extends TokenData { }