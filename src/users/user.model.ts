import { prop } from '@typegoose/typegoose';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export class User {
  @prop()
  _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  @prop({ required: true })
  name: string;

  @IsString()
  @prop({ required: true })
  lastName: string;

  @IsString()
  @prop({ unique: true, required: true })
  email: string;

  @IsString()
  @prop({ required: true })
  emailValidationCode: string;

  @IsBoolean()
  @prop({ default: false })
  isValidEmail: boolean;

  @IsString()
  @prop({ unique: true, required: true })
  phoneNumber: string;

  @IsString()
  @prop({ required: true })
  phoneValidationCode: string;

  @IsBoolean()
  @prop({ default: false })
  isValidPhone: boolean;

  @IsString()
  @prop({ required: true, hidden: true })
  password: string;

  @IsString()
  @prop({ required: true, hidden: true })
  salt: string;

  @IsDate()
  @prop()
  createdAt: Date;

  @IsDate()
  @prop()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
