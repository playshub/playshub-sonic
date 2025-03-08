import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QueueJobType, QueueType } from 'src/types/queue';

export interface CreateNewUserJobData {
  signedTransactionRaw: string;
}

@Injectable()
export class CreateNewUserService {
  constructor(
    @InjectQueue(QueueType.CreateNewUser)
    private readonly createNewUserQueue: Queue,
  ) {}

  async addJob(signedTransactionRaw: string) {
    return this.createNewUserQueue.add(
      QueueJobType.CreateNewUser,
      { signedTransactionRaw },
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
