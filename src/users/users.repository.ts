import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findById(userId: string): Promise<User> {
    return await this.userModel
      .findById(userId)
      .select('-password -salt -__v')
      .exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password -salt -__v').exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('-password -salt -__v')
      .exec();
  }
}
