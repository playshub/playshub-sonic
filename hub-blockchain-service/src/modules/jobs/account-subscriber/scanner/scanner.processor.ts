import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Cache } from 'cache-manager';
import { SolanaRpcService } from 'src/modules/solana-rpc/solana-rpc.service';

import { QueueType } from 'src/types/queue';
import { SYNC_BATCH_SIZE, SYNC_INTERVAL } from 'src/utils/constants';
import { AccountSubscriberHandlerService } from '../handler/handler.service';

@Processor(QueueType.AccountSubscriberScanner, {
  concurrency: 1,
})
export class ScannerProcessor extends WorkerHost {
  private readonly logger = new Logger(ScannerProcessor.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private solanaRpcService: SolanaRpcService,
    private handlerService: AccountSubscriberHandlerService,
  ) {
    super();
  }

  async process(job: Job) {
    try {
      this.logger.debug(
        `Attempts (#${job.attemptsMade}) to process job ${job.name} with data: ${JSON.stringify(job.data)}`,
      );
      this.logger.debug(`Scanning every ${SYNC_INTERVAL} seconds`);

      const latestTxSignature = await this.cacheManager.get<string>(
        'latest_tx_signature',
      );

      const transactions = await this.solanaRpcService.getSignaturesForAddress({
        limit: SYNC_BATCH_SIZE,
        until: latestTxSignature,
      });

      if (!transactions.length) {
        return;
      }

      this.logger.debug(`Found new ${transactions.length} transactions!`);
      await this.handlerService.addJob(transactions);
      await this.cacheManager.set(
        'latest_tx_signature',
        transactions[0].signature,
      );
    } catch (error) {
      this.logger.error('Error scanning transactions');
      this.logger.debug(error);
      throw error;
    }
  }
}
