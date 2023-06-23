import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') username: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('dob') dob: String,
  ) {
    const generatedId = await this.usersService.insertUser(
      username,
      name,
      email,
      phone,
      dob,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') prodId: string) {
    return this.usersService.getSingleUser(prodId);
  }

  @Patch(':username')
  async updateUser(
    @Param('id') prodId: string,
    @Body('username') username: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('dob') dob: String,
  ) {
    await this.usersService.updateUser(prodId, username,
      name,
      email,
      phone,
      dob,);
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') prodId: string) {
      await this.usersService.deleteUser(prodId);
      return null;
  }
}
