import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../entities/user.entity';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
