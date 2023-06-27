import { Controller, Bind, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginDto, RegisterDto } from './auth/dto/authenticate-dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
