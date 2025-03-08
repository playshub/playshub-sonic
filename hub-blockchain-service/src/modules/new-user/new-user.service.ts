import { Injectable } from '@nestjs/common';
import { CreateNewUserService } from '../jobs/create-new-user/create-new-user.service';

@Injectable()
export class NewUserService {
  constructor(private readonly createNewUserService: CreateNewUserService) {}

  async createUser(signedTransactionRaw: string) {
    await this.createNewUserService.addJob(signedTransactionRaw);

    return {
      success: true,
    };
  }
}
