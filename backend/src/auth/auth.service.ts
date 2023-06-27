import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/authenticate-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user != null) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (user && isMatch) {
        const { ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      
      User: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      accessToken: this.jwtService.sign(payload),
      accessExpires: '3600'
    };
  }

  async register(createUserDto: CreateUserDto) {
    // await this.usersService.clearUsersTable();
    return this.usersService.createUser(createUserDto);
  }
}
