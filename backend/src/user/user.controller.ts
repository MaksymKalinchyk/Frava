import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async createUser(@Body() user: User): Promise<User> {
  //   return this.userService.createUser(user);
  // }

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.createUser(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.userService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
