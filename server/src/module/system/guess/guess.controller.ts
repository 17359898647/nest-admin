import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
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

  @Get(':id')
  @ApiOperation({ summary: '获取单条记录' })
  async findOne(@Param('id') id: number) {
    return await this.guessService.findOne(id)
  }

  @Post('update')
  @ApiOperation({ summary: '修改记录' })
  async update(
    @Body('id') id: number,
    @Body('number') number: number,
  ) {
    return await this.guessService.update(id, number)
  }

  @Post('create')
  @ApiOperation({ summary: '手动创建记录' })
  async create(@Body('number') number: number) {
    return await this.guessService.create(number)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除记录' })
  async delete(@Param('id') id: number) {
    return await this.guessService.delete(id)
  }
}
