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
  teacherId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
  },
  oldScheduling: { type: Boolean },
})

export const Schedule = mongoose.model('Schedule', scheduleSchema)
