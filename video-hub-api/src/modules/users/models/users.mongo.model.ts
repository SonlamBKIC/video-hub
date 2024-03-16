import mongoose from 'mongoose';
import { MongooseModelFactory } from '@infrastructures/mongoose';
import { UserEntity } from '../output';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({
  username: 1,
});

userSchema
  .virtual('id')
  .get(function () {
    return this._id;
  })
  .set(function (id: string) {
    this.set({ _id: id });
  });

export const UserMongoModel = MongooseModelFactory.compile<UserEntity>({
  name: 'users',
  schema: userSchema,
});
