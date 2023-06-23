import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async insertUser(username: String, name: string, email: string, phone: number, dob: String) {
    const newUser = new this.userModel({
      username,
      name,
      email,
      phone,
      dob
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob
    }));
  }

  async getSingleUser(username: string) {
    const user = await this.findUser(username);
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob
    };
  }

  async updateUser(
    userId: string,
    username: String,
    name:   String,
    email: String, 
    phone: Number,
    dob: String,
  ) {
    const updatedUser = await this.findUser(username);
    if(username){
      updatedUser.username=username;
    }
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    if (dob) {
      updatedUser.dob = dob;
    }

    updatedUser.save();
  }

  async deleteUser(prodId: string) {
    const result = await this.userModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(userName: String): Promise<User> {
    let user;
    try {
      user = await this.userModel.findOne({username: userName});
    } catch (error) {
      throw new NotFoundException('Could not find user by username');
    }
    console.log(await this.userModel.find())
    if (!user) {
      throw new NotFoundException('Could not find user. not user');
    }
    return user;
  }
}
