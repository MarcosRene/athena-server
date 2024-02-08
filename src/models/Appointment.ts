import mongoose, { Schema } from 'mongoose'

const AppointmentSchema = new Schema({
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
  dateTime: {
    type: Date,
  },
  oldScheduling: { type: Boolean },
})

export const Appointment = mongoose.model('Appointment', AppointmentSchema)
