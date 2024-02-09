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
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
  },
  oldScheduling: { type: Boolean },
})

export const Schedule = mongoose.model('Schedule', scheduleSchema)
