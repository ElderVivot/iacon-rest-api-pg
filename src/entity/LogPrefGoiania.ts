/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import PrefGoianiaAccess from './PrefGoianiaAccess'

@Entity()
export default class LogPrefGoiania {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => PrefGoianiaAccess, prefGoianiaAccess => prefGoianiaAccess.logsPrefGoiania)
    prefGoianiaAccess: PrefGoianiaAccess;

    @Column()
    inscricaoMunicipal: String

    @Column()
    nameCompanie: string

    @Column()
    hourLog: Date

    @Column()
    dateStartDown: Date

    @Column()
    dateEndDown: Date

    @Column()
    messageLog: String

    @Column()
    urlImageDown: String
}