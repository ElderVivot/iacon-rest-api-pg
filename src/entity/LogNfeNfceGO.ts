/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class LogNfeNfceGO {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    cgceCompanie: string

    @Column({ nullable: true })
    codeCompanie: string

    @Column({ nullable: true })
    nameCompanie: string

    @Column({ nullable: true })
    modelNF: string

    @Column()
    wayCertificate: string

    @Column()
    hourLog: Date

    @Column({ nullable: true })
    dateStartDown: Date

    @Column({ nullable: true })
    dateEndDown: Date

    @Column()
    typeLog: 'success' | 'error' | 'warning'

    @Column()
    messageLog: string

    @Column()
    messageLogToShowUser: string

    @Column({ nullable: true })
    messageError: string

    @Column()
    urlImageDown: string

    @Column({ nullable: true, default: 0 })
    qtdNotesDown: number

    @Column({ default: 0 })
    qtdTimesReprocessed: number
}