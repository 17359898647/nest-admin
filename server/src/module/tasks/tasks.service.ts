import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  /**
   * 每5秒执行一次的定时任务
   */
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'test',
    timeZone: 'Asia/Shanghai',
  })
  async handleTask() {
    this.logger.log('开始执行定时任务...')
    try {
      // 在这里实现定时任务的具体逻辑

      this.logger.log('定时任务执行完成')
    }
    catch (error) {
      this.logger.error('定时任务执行失败', error)
    }
  }
}
