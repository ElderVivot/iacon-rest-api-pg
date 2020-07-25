import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Companies {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    codeCompanie: String

    @Column({ nullable: true })
    nameCompanie: String

    @Column()
    cgceCompanie: String

    @Column()
    inscricaoEstadualCompanie: String

    @Column()
    numberNote: String

    @Column()
    dateNote: Date

    @Column({ nullable: true })
    nameTomador: String

    @Column({ nullable: true })
    cgceTomador: String

    @Column({ nullable: true })
    statusNote: String

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountNote: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountCalculationBasis: Number

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    rateISS: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountISS: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountCSLL: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountINSS: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountIRRF: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountPIS: Number

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amountCOFINS: Number
}