import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class UpdateBalanceDto {
  @ApiProperty({
    required: true,
    description: '用户ID',
  })
  @IsNumber()
  userId: number

  @ApiProperty({
    required: true,
    description: '金额变更值，可以为正数（增加金额）或负数（减少金额）',
  })
  @IsNumber()
  amount: number

  @ApiProperty({
    required: false,
    description: '备注',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string
}
