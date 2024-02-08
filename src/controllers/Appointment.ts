import { Request, Response } from 'express'
import crypto from 'crypto'

import { Appointment } from '../models/Appointment'
import { User } from '../models/User'

class ScheduleController {
  async index(req: Request, res: Response) {
    try {
      const appointments = await Appointment.find()

      res.status(201).json(appointments)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { subject, description, teacherId, dateTime } = req.body

      const user = await User.findById(teacherId)

      if (!user) {
        return res.status(401).json({ error: 'User not found.' })
      }

      const appointment = await Appointment.create({
        identifier: `#${crypto.randomBytes(4).toString('hex')}`,
        subject,
        description,
        teacherId,
        dateTime,
        oldScheduling: null,
      })

      res.status(201).json(appointment)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const appointment = await Appointment.findById(id)

      if (!appointment) {
        return res.status(401).json({ error: 'Appointment not found.' })
      }

      res.status(201).json(appointment)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const appointment = await Appointment.findById(id)

      if (!appointment) {
        return res.status(401).json({ error: 'Appointment not found.' })
      }

      const updateAppointment = await Appointment.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      )

      res.status(201).json(updateAppointment)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params

      const appointment = await Appointment.findByIdAndDelete(id)

      if (!appointment) {
        return res.status(401).json({ error: 'Appointment not found.' })
      }

      res.status(204).send()
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new ScheduleController()
