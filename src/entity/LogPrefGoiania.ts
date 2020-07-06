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

    @ManyToOne(type => PrefGoianiaAccess, prefGoianiaAccess => prefGoianiaAccess.logsPrefGoiania, { onDelete: 'CASCADE' })
    prefGoianiaAccess: PrefGoianiaAccess;

    @Column({ nullable: true })
    inscricaoMunicipal: String

    @Column({ nullable: true })
    codeCompanie: string

    @Column({ nullable: true })
    nameCompanie: string

    @Column()
    hourLog: Date

    @Column({ nullable: true })
    dateStartDown: Date

    @Column({ nullable: true })
    dateEndDown: Date

    @Column()
    typeLog: 'success' | 'error' | 'warning'

    @Column()
    messageLog: String

    @Column({ nullable: true })
    messageError: String

    @Column()
    urlImageDown: String
}