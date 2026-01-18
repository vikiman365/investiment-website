import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshTokens: {
    token: string;
    expiresAt: Date;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
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
    refreshTokens: [
      {
        token: String,
        expiresAt: Date,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// JSON transformation to remove sensitive data - FIXED
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(_, ret: Record<string, any>) {
    // Use optional chaining or check if property exists
    if (ret.password !== undefined) {
      delete ret.password;
    }
    if (ret.refreshTokens !== undefined) {
      delete ret.refreshTokens;
    }
    return ret;
  },
});

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);