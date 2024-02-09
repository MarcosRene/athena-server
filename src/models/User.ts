import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  avatar: { type: String },
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER'],
    default: 'STUDENT',
  },
})

export const User = mongoose.model('User', userSchema)
