import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { SolanaRpcModule } from '../solana-rpc/solana-rpc.module';

@Module({
  imports: [SolanaRpcModule],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
