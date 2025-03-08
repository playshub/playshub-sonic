import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfirmedSignatureInfo } from '@solana/web3.js';
import { Queue } from 'bullmq';
import { QueueJobType, QueueType } from 'src/types/queue';

export interface AccountSubscriberHandlerJobData {
  signatures: ConfirmedSignatureInfo[];
}

@Injectable()
export class AccountSubscriberHandlerService {
  constructor(
    @InjectQueue(QueueType.AccountSubscriberHandler)
    private readonly accountSubscriberHandlerQueue: Queue,
  ) {}

  async addJob(signatures: ConfirmedSignatureInfo[]) {
    return this.accountSubscriberHandlerQueue.add(
      QueueJobType.AccountSubscriberHandler,
      { signatures },
      {
        removeOnComplete: { count: 10 },
        removeOnFail: { count: 10 },
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );
  }
}
