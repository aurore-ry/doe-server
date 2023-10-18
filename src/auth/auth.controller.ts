import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, LoginUserDto } from 'src/users/users.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async addUser(
    @Req() req,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const newUser = await this.userService.create(createUserDto);
    console.log(newUser);
    res.redirect('http://localhost:3001/dashboard');
  }

  @Post('/signin')
  async connectUser(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const authValid = await this.userService.login(loginUserDto);
    console.log(authValid, 'auth');
    if (authValid === false) {
      throw new BadRequestException('Invalid credentials');
    } else {
      response.redirect('http://localhost:3001/dashboard');
    }

    console.log(authValid);

    response.cookie('rememberme', '1', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    return true;
  }
}
