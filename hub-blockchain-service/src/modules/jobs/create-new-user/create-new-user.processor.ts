import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { QueueType } from 'src/types/queue';
import { CreateNewUserJobData } from './create-new-user.service';
import { SolanaRpcService } from 'src/modules/solana-rpc/solana-rpc.service';
import { Transaction } from '@solana/web3.js';

@Processor(QueueType.CreateNewUser, {
  concurrency: 3,
})
export class CreateNewUserProcessor extends WorkerHost {
  private readonly logger = new Logger(CreateNewUserProcessor.name);

  constructor(private readonly solanaRpcService: SolanaRpcService) {
    super();
  }

  async process(job: Job<CreateNewUserJobData>) {
    this.logger.debug(
      `Attempts (#${job.attemptsMade}) to process job ${job.name} with data: ${JSON.stringify(job.data)}`,
    );
    const { signedTransactionRaw } = job.data;
    try {
      const feePayer = this.solanaRpcService.getSigner();

      const serializedTxBuffer = Buffer.from(signedTransactionRaw, 'base64');
      const transaction = Transaction.from(serializedTxBuffer);

      transaction.partialSign(feePayer);

      return this.solanaRpcService.sendRawTransaction(transaction);
    } catch (error) {
      this.logger.debug(error);
      this.logger.error(
        `Error create new user with signature: ${signedTransactionRaw}`,
      );

      if (error.message.includes('Reached end of buffer unexpectedly')) {
        this.logger.error('Invalid signature format');
      } else if (error.message.includes('unknown signer')) {
        this.logger.error('Invalid signature');
      }

      throw error;
    }
  }
}
