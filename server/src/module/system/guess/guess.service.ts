import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'

import { Guess } from './guess.entity'

@Injectable()
export class GuessService {
  private readonly logger = new Logger(GuessService.name)

  constructor(
    @InjectRepository(Guess)
    private readonly guessRepository: Repository<Guess>,
  ) {}

  /**
   * 生成一期猜大小
   */
  async generateGuess() {
    try {
      // 生成期号：yyyyMMddHHmmss
      const issueNumber = dayjs().format('YYYYMMDDHHmmss')

      // 生成1-10的随机数
      const number = Math.floor(Math.random() * 10) + 1

      // 判断大小：大于5为大，小于等于5为小
      const result = number > 5 ? '大' : '小'

      // 保存到数据库
      const guess = new Guess()
      guess.issueNumber = issueNumber
      guess.number = number
      guess.result = result

      await this.guessRepository.save(guess)

      this.logger.log(`生成第 ${issueNumber} 期猜大小成功：号码 ${number}，结果 ${result}`)
      return guess
    }
    catch (error) {
      this.logger.error('生成猜大小失败', error)
      throw error
    }
  }

  /**
   * 获取最新一期
   */
  async getLatest() {
    return await this.guessRepository.findOne({
      order: {
        createTime: 'DESC',
      },
    })
  }

  /**
   * 获取历史记录
   */
  async getHistory(page = 1, size = 10) {
    const [items, total] = await this.guessRepository.findAndCount({
      order: {
        createTime: 'DESC',
      },
      skip: (page - 1) * size,
      take: size,
    })

    return {
      items,
      total,
    }
  }
}
