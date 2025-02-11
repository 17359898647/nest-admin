import { Module } from '@nestjs/common'

import { GuessModule } from '../system/guess/guess.module'

import { TasksService } from './tasks.service'

@Module({
  imports: [GuessModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
