import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class NewUserDto {
  @IsString()
  @ApiProperty({
    description: 'The signed transaction raw',
  })
  signedTransactionRaw: string;
}
