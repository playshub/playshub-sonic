import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QueueType } from 'src/types/queue';
import { SolanaRpcModule } from 'src/modules/solana-rpc/solana-rpc.module';
import { CreateNewUserService } from './create-new-user.service';
import { CreateNewUserProcessor } from './create-new-user.processor';

@Module({
  imports: [
    SolanaRpcModule,
    BullModule.registerQueue({
      name: QueueType.CreateNewUser,
    }),
    BullBoardModule.forFeature({
      name: QueueType.CreateNewUser,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [CreateNewUserService, CreateNewUserProcessor],
  exports: [CreateNewUserService],
})
export class CreateNewUserModule {}
