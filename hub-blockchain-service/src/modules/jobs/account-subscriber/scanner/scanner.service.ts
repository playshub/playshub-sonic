import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueJobType, QueueType } from 'src/types/queue';
import { SYNC_INTERVAL } from 'src/utils/constants';

@Injectable()
export class ScannerService {
  constructor(
    @InjectQueue(QueueType.AccountSubscriberScanner)
    private readonly scannerQueue: Queue,
  ) {}

  async onModuleInit() {
    await this.scannerQueue.drain();
    await this.addScanRepeatJob();
  }

  async addScanRepeatJob() {
    await this.scannerQueue.add(
      QueueJobType.AccountSubscriberScanner,
      {},
      {
        jobId: QueueJobType.AccountSubscriberScanner, // Ensure uniqueness of the job
        repeat: {
          pattern: `*/${SYNC_INTERVAL} * * * * *`,
        },
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
