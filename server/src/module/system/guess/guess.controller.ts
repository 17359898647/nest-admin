import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { GuessService } from './guess.service'

@ApiTags('猜大小')
@Controller('system/guess')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Get('latest')
  @ApiOperation({ summary: '获取最新一期' })
  async getLatest() {
    return await this.guessService.getLatest()
  }

  @Get('history')
  @ApiOperation({ summary: '获取历史记录' })
  async getHistory(
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return await this.guessService.getHistory(page, size)
  }
}
