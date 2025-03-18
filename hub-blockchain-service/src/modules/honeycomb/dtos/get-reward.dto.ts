import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetRewardDto {
  @IsString()
  @ApiProperty({
    description: 'The public key of the user',
  })
  userPublicKey: string;

  @IsString()
  @ApiProperty({
    description: 'The account id of the user',
  })
  accountId: string;
}
