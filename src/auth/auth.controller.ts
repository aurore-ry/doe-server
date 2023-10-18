import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from 'src/users/users.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async addUser(@Req() req, @Body() CreateUserDto: CreateUserDto) {
    const newUser = await this.userService.create(CreateUserDto);
    console.log(newUser);
  }
}
