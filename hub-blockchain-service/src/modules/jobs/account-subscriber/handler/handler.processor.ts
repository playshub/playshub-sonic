import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { QueueType } from 'src/types/queue';
import { SolanaRpcService } from 'src/modules/solana-rpc/solana-rpc.service';
import { AccountSubscriberHandlerJobData } from './handler.service';
import { MEMO_PROGRAM_ID, WELCOME_MEMO_MESSAGE } from 'src/utils/constants';
import { ParsedInstruction } from '@solana/web3.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor(QueueType.AccountSubscriberHandler, {
  concurrency: 3,
})
export class AccountSubscriberHandlerProcessor extends WorkerHost {
  private readonly logger = new Logger(AccountSubscriberHandlerProcessor.name);

  constructor(
    private readonly solanaRpcService: SolanaRpcService,
    private eventEmitter: EventEmitter2,
  ) {
    super();
  }

  async process(job: Job<AccountSubscriberHandlerJobData>) {
    this.logger.debug(
      `Attempts (#${job.attemptsMade}) to process job ${job.name} with data: ${JSON.stringify(job.data)}`,
    );
    const { signatures } = job.data;
    try {
      const txs = await this.solanaRpcService.getTransactions(
        signatures.map((tx) => tx.signature),
      );

      const parsedMemos = txs
        .filter((tx) => tx)
        .map((tx) => {
          const memo = tx.transaction.message.instructions.find(
            (instruction) =>
              instruction.programId.toString() === MEMO_PROGRAM_ID,
          ) as ParsedInstruction;

          if (memo) {
            if (memo.parsed == WELCOME_MEMO_MESSAGE) {
              return;
            } else {
              return JSON.parse(memo.parsed);
            }
          }
        })
        .filter((memo) => memo);

      this.eventEmitter.emit('sol.transactions', parsedMemos);
    } catch (error) {
      this.logger.debug(error);
      this.logger.error(`Error handle account signatures: ${signatures}`);

      throw error;
    }
  }
}
