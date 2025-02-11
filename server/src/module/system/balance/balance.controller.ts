import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { BalanceService } from './balance.service'
import { UpdateBalanceDto } from './dto/balance.dto'

@ApiTags('余额管理')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ summary: '获取用户余额' })
  @Get(':userId')
  getBalance(@Param('userId') userId: number) {
    return this.balanceService.getBalance(userId)
  }

  @ApiOperation({ summary: '修改用户余额' })
  @Post('update')
  updateBalance(@Body() updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.updateBalance(updateBalanceDto)
  }
}
