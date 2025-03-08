import { Module } from '@nestjs/common';
import { NewUserService } from './new-user.service';
import { NewUserController } from './new-user.controller';
import { CreateNewUserModule } from '../jobs/create-new-user/create-new-user.module';

@Module({
  imports: [CreateNewUserModule],
  providers: [NewUserService],
  controllers: [NewUserController],
})
export class NewUserModule {}
