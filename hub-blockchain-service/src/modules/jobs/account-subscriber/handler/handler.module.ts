import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QueueType } from 'src/types/queue';
import { AccountSubscriberHandlerProcessor } from './handler.processor';
import { AccountSubscriberHandlerService } from './handler.service';
import { SolanaRpcModule } from 'src/modules/solana-rpc/solana-rpc.module';

@Module({
  imports: [
    SolanaRpcModule,
    BullModule.registerQueue({
      name: QueueType.AccountSubscriberHandler,
    }),
    BullBoardModule.forFeature({
      name: QueueType.AccountSubscriberHandler,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [
    AccountSubscriberHandlerProcessor,
    AccountSubscriberHandlerService,
  ],
  exports: [AccountSubscriberHandlerService],
})
export class AccountSubscriberHandlerModule {}
