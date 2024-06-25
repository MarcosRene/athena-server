import mongoose, { Schema } from 'mongoose'

const scheduleSchema = new Schema({
  identifier: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: String,
  },
  oldScheduling: { type: Boolean },
})

export const Schedule = mongoose.model('Schedule', scheduleSchema)
