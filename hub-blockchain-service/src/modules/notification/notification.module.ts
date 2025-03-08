import { Module } from '@nestjs/common';
import { PlayshubWebhookService } from './webhooks/playshub-webhook.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PlayshubWebhookService],
})
export class NotificationModule {}
