import { IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  to: string;

  @IsNumber()
  amount: number;
}
