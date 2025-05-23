import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
