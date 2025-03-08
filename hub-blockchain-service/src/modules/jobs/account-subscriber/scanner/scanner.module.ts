import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QueueType } from 'src/types/queue';
import { ScannerProcessor } from './scanner.processor';
import { ScannerService } from './scanner.service';
import { SolanaRpcModule } from 'src/modules/solana-rpc/solana-rpc.module';
import { AccountSubscriberHandlerModule } from '../handler/handler.module';

@Module({
  imports: [
    AccountSubscriberHandlerModule,
    SolanaRpcModule,
    BullModule.registerQueue({
      name: QueueType.AccountSubscriberScanner,
    }),
    BullBoardModule.forFeature({
      name: QueueType.AccountSubscriberScanner,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [ScannerProcessor, ScannerService],
})
export class AccountSubscriberScannerModule {}
