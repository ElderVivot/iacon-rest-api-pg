import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class CompaniesGoiania {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ unique: true })
    inscricaoMunicipal: string

    @Column()
    name: string

    @Column({ nullable: true })
    cgce: string

    @Column({ nullable: true })
    code: string
}