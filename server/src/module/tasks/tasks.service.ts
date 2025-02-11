import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { GuessService } from '../system/guess/guess.service'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(private readonly guessService: GuessService) {}

  /**
   * 每5秒生成一期猜大小
   */
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'generateGuess',
    timeZone: 'Asia/Shanghai',
  })
  async handleTask() {
    this.logger.log('开始生成新一期猜大小...')
    try {
      await this.guessService.generateGuess()
      this.logger.log('生成新一期猜大小完成')
    }
    catch (error) {
      this.logger.error('生成新一期猜大小失败', error)
    }
  }
}
