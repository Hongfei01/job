import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    lastName: {
      type: String,
      default: 'lastName',
    },
    location: {
      type: String,
      default: 'my city',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', UserSchema);
