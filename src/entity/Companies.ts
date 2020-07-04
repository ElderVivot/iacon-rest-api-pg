import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Companies {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ default: false })
    deletedInOriginalDatabase: boolean

    @Column({ unique: true })
    code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    nickName: string;

    @Column()
    typeCgce: string;

    @Column()
    cgce: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    ddd: number;

    @Column({ nullable: true })
    fone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    ramo: string;

    @Column()
    dateInicialAsCompanie: Date;

    @Column({ nullable: true })
    dateInicialAsClient: Date;

    @Column({ nullable: true })
    dateFinalAsClient: Date;

    @Column({ nullable: true })
    inscricaoEstadual: string;

    @Column({ nullable: true })
    inscricaoMunicipal: string;
}