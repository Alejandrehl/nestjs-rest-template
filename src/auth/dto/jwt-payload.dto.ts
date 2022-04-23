import * as mongoose from 'mongoose';

export class JwtPayloadDto {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  emailValidationCode: string;
  isValidEmail: boolean;
  phoneNumber: string;
  phoneValidationCode: string;
  isValidPhone: boolean;
  createdAt: Date;
  updatedAt: Date;
}
