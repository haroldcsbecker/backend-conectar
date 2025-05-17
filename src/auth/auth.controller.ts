import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
// import { JwtGuard } from './guards/jwt.guard';
import { AuthRegisterPayloadDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  register(@Body() authRegisterPayloadDto: AuthRegisterPayloadDto) {
    return this.authService.register(authRegisterPayloadDto);
  }
}
