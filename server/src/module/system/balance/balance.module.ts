import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '../user/entities/sys-user.entity'

import { BalanceController } from './balance.controller'
import { BalanceService } from './balance.service'
import { BalanceEntity } from './entities/balance.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity, UserEntity])],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
