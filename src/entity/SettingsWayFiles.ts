import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class SettingsWayFiles {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    folderToSaveLogGoiania: String

    @Column({ nullable: true })
    folderToSaveXMLsGoiania: String

    @Column({ nullable: true })
    folderToSaveXMLsGoianiaRotinaAutomatica: String

    @Column({ nullable: true })
    folderToReadSpedFiscal: String

    @Column({ nullable: true })
    folderToReadSpedContribuicoes: String

    @Column({ nullable: true })
    folderToReadDCTF: String

    @Column({ nullable: true })
    folderToReadSimplesNacional: String

    @Column({ nullable: true })
    folderToReadNFe: String
}