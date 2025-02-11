import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Guess {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '期号', length: 14 })
  issueNumber: string

  @Column({ comment: '开奖号码', type: 'int' })
  number: number

  @Column({ comment: '大小结果', length: 10 })
  result: string

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date
}
