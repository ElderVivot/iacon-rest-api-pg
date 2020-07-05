/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

import LogPrefGoiania from './LogPrefGoiania'

@Entity()
export default class PrefGoianiaAccess {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ unique: true })
    user: String

    @Column()
    password: string

    @Column()
    name: string

    @OneToMany(type => LogPrefGoiania, logPrefGoiania => logPrefGoiania.prefGoianiaAccess)
    logsPrefGoiania: LogPrefGoiania[];
}