// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface RefreshToken {
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshTokens: RefreshToken[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const RefreshTokenSchema = new Schema<RefreshToken>(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokens: {
      type: [RefreshTokenSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function () {
  // `this` is the document being saved
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// JSON transformation to remove sensitive data
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (_doc: any, ret: any) {
    // cast to any to avoid "operand of delete must be optional" TypeScript error
    if (ret) {
      delete (ret as any).password;
      delete (ret as any).refreshTokens;
    }
    return ret;
  },
});

// Virtual for full name
UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
