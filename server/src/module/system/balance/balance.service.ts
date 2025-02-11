import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/entities/sys-user.entity'
import { UpdateBalanceDto } from './dto/balance.dto'
import { BalanceEntity } from './entities/balance.entity'

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepo: Repository<BalanceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  /**
   * 获取用户余额
   * @param userId 用户ID
   * @returns 
   */
  async getBalance(userId: number) {
    const balance = await this.balanceRepo.findOne({
      where: { userId },
      order: { createTime: 'DESC' },
    })
    return balance || { balance: 0 }
  }

  /**
   * 修改用户余额
   * @param updateBalanceDto 
   * @returns 
   */
  async updateBalance(updateBalanceDto: UpdateBalanceDto) {
    const { userId, amount, remark } = updateBalanceDto
    
    // 检查用户是否存在
    const user = await this.userRepo.findOne({ where: { userId } })
    if (!user) {
      throw new BadRequestException('用户不存在')
    }

    // 获取当前余额
    const currentBalance = await this.getBalance(userId)

    // 如果是减少余额，需要检查余额是否足够
    if (amount < 0 && currentBalance.balance + amount < 0) {
      throw new BadRequestException('用户余额不足')
    }

    // 创建新的余额记录
    const newBalance = await this.balanceRepo.save({
      userId,
      balance: currentBalance.balance + amount,
      remark,
    })

    return newBalance
  }
}
