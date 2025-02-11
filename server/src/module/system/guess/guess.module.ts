import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GuessController } from './guess.controller'
import { Guess } from './guess.entity'
import { GuessService } from './guess.service'

@Module({
  imports: [TypeOrmModule.forFeature([Guess])],
  controllers: [GuessController],
  providers: [GuessService],
  exports: [GuessService],
})
export class GuessModule {}
