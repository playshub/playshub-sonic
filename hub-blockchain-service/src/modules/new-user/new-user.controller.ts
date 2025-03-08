import { Body, Controller, Post } from '@nestjs/common';
import { NewUserService } from './new-user.service';
import { NewUserDto } from './dtos/new-user.dto';

@Controller('new-user')
export class NewUserController {
  constructor(private readonly newUserService: NewUserService) {}

  @Post()
  async createUser(@Body() body: NewUserDto) {
    return this.newUserService.createUser(body.signedTransactionRaw);
  }
}
