import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, LoginUserDto } from 'src/users/users.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  myCookie = process.env.COOKIE_NAME;
  @Post('/signup')
  async addUser(
    @Req() reply: FastifyReply,
    @Body() createUserDto: CreateUserDto,
  ) {
    const newUser = await this.userService.create(createUserDto);
    console.log(newUser);
    reply.redirect(302, 'http://localhost:3001/dashboard');
  }

  @Post('/signin')
  async connectUser(
    @Res()
    reply: FastifyReply,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const user = await this.userService.login(loginUserDto);
    if (user == null) {
      throw new BadRequestException('Invalid credentials');
    } else {
      reply.setCookie(this.myCookie, user.id, {
        maxAge: 2073600,
        httpOnly: true,
        path: '/',
        secure: true,
        signed: true,
      });
    }

    return reply.redirect(302, 'http://localhost:3001/dashboard');
  }
}
