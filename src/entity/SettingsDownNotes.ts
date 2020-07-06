import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class SettingsDownNotes {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ default: 'C:/notas_fiscais/goiania/logs/hourLog/accessGoiania/nameCompanieWithIM' })
    folderToSaveLogGoiania: String

    @Column({ default: 'C:/notas_fiscais/goiania/xmls/nameCompanieWithIM/year/month' })
    folderToSaveXMLsGoiania: String
}