import { IsString } from 'class-validator';

export class NewUserDto {
  @IsString()
  signedTransactionRaw: string;
}
