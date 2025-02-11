import { BaseEntity } from 'src/common/entities/base'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from '../../user/entities/sys-user.entity'

@Entity('tw_balance', {
  comment: '用户余额表',
})
export class BalanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'balance_id', comment: '余额ID' })
  public balanceId: number

  @Column({ type: 'int', name: 'user_id', comment: '用户ID' })
  public userId: number

  @Column({ type: 'decimal', name: 'balance', precision: 10, scale: 2, default: 0, comment: '用户余额' })
  public balance: number

  @Column({ type: 'varchar', name: 'remark', length: 500, default: '', comment: '备注' })
  public remark: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity
}
