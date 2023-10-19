import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
export class CreateUserDto {
  @IsAlphanumeric()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly passwordConfirm: string;
}
export class UpdatePasswordDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;

  @IsNotEmpty()
  @ApiProperty()
  old_password: string;
}
