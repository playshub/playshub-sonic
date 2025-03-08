import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './dtos/transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async transfer(@Body() body: TransferDto) {
    return this.transferService.transferSol(body.to, body.amount);
  }
}
