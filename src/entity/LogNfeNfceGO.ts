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

    @Column({ nullable: true })
    situacaoNF: string

    @Column()
    wayCertificate: string

    @Column()
    hourLog: Date

    @Column({ nullable: true })
    dateStartDown: Date

    @Column({ nullable: true })
    dateEndDown: Date

    @Column()
    typeLog: 'success' | 'error' | 'warning' | 'processing'

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

    @Column({ nullable: true, default: 0 })
    qtdPagesTotal: number

    @Column({ nullable: true, default: 0 })
    pageInicial: number

    @Column({ nullable: true, default: 0 })
    pageFinal: number

    @Column({ default: 0 })
    qtdTimesReprocessed: number
}