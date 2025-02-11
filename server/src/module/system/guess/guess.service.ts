import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'

import { Guess } from './entities/guess.entity'

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

      // 查找是否已有指定结果
      const existingGuess = await this.guessRepository.findOne({
        where: { issueNumber },
      })

      if (existingGuess) {
        // 更新创建时间
        existingGuess.createTime = new Date()
        await this.guessRepository.save(existingGuess)

        this.logger.log(`第 ${issueNumber} 期已存在指定结果：号码 ${existingGuess.number}，结果 ${existingGuess.result}`)
        return existingGuess
      }

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

  /**
   * 修改记录
   */
  async update(id: number, number: number) {
    try {
      const guess = await this.guessRepository.findOne({
        where: { id },
      })

      if (!guess) {
        throw new Error('记录不存在')
      }

      // 更新号码和结果
      guess.number = number
      guess.result = number > 5 ? '大' : '小'

      await this.guessRepository.save(guess)

      this.logger.log(`修改第 ${guess.issueNumber} 期猜大小成功：号码 ${number}，结果 ${guess.result}`)
      return guess
    }
    catch (error) {
      this.logger.error('修改猜大小失败', error)
      throw error
    }
  }

  /**
   * 删除记录
   */
  async delete(id: number) {
    try {
      const guess = await this.guessRepository.findOne({
        where: { id },
      })

      if (!guess) {
        throw new Error('记录不存在')
      }

      await this.guessRepository.remove(guess)

      this.logger.log(`删除第 ${guess.issueNumber} 期猜大小成功`)
      return true
    }
    catch (error) {
      this.logger.error('删除猜大小失败', error)
      throw error
    }
  }

  /**
   * 获取单条记录
   */
  async findOne(id: number) {
    const guess = await this.guessRepository.findOne({
      where: { id },
    })

    if (!guess) {
      throw new Error('记录不存在')
    }

    return guess
  }

  /**
   * 根据期号查找记录
   */
  async findByIssueNumber(issueNumber: string) {
    const guess = await this.guessRepository.findOne({
      where: { issueNumber },
    })

    if (!guess) {
      throw new Error('记录不存在')
    }

    return guess
  }

  /**
   * 指定期号的结果
   */
  async setResult(issueNumber: string, number: number) {
    try {
      const guess = await this.guessRepository.findOne({
        where: { issueNumber },
      })

      if (!guess) {
        // 如果记录不存在，创建新记录
        const guess = new Guess()
        guess.issueNumber = issueNumber
        guess.number = number
        guess.result = number > 5 ? '大' : '小'

        await this.guessRepository.save(guess)

        this.logger.log(`创建第 ${issueNumber} 期猜大小成功：号码 ${number}，结果 ${guess.result}`)
        return guess
      }

      // 更新号码和结果
      guess.number = number
      guess.result = number > 5 ? '大' : '小'

      await this.guessRepository.save(guess)

      this.logger.log(`修改第 ${issueNumber} 期猜大小成功：号码 ${number}，结果 ${guess.result}`)
      return guess
    }
    catch (error) {
      this.logger.error('设置猜大小结果失败', error)
      throw error
    }
  }
}
