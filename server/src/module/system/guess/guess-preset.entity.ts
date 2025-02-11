import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tw_guess_preset')
export class GuessPreset {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '预设号码', type: 'int' })
  number: number

  @Column({ comment: '预设结果', length: 10 })
  result: string

  @Column({ comment: '是否已使用', default: false })
  used: boolean

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createTime: Date
}
