import { Request, Response } from 'express'
import crypto from 'crypto'
import dayjs from 'dayjs'

import { Schedule } from '../models/Schedule'
import { User } from '../models/User'

class ScheduleController {
  async index(req: Request, res: Response) {
    try {
      const schedules = await Schedule.find()

      const allSchedules = schedules.map((schedule) => {
        const {
          _id,
          identifier,
          subject,
          description,
          teacherId,
          date,
          time,
          __v,
        } = schedule

        const formattedDateTime = dayjs(`${date} ${time}`)

        const isOldScheduling = dayjs().isAfter(formattedDateTime, 'minute')

        return {
          _id,
          identifier,
          subject,
          description,
          teacherId,
          dateTime: formattedDateTime.format('DD [de] MMMM [às] HH:mm'),
          oldScheduling: isOldScheduling,
          __v,
        }
      })

      res.status(200).json(allSchedules)
    } catch (error) {
      res.status(500).json()
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { subject, description, teacherId, date, time } = req.body

      const user = await User.findById(teacherId)

      if (!user) {
        return res.status(401).json({ error: 'User not found.' })
      }

      const schedule = await Schedule.create({
        identifier: `#${crypto.randomBytes(4).toString('hex')}`,
        subject,
        description,
        teacherId,
        date,
        time,
        oldScheduling: null,
      })

      res.status(201).json(schedule)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const schedule = await Schedule.findById(id)

      if (!schedule) {
        return res.status(401).json({ error: 'Schedule not found.' })
      }

      res.status(201).json(schedule)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const schedule = await Schedule.findById(id)

      if (!schedule) {
        return res.status(401).json({ error: 'Schedule not found.' })
      }

      const updateSchedule = await Schedule.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      )

      res.status(201).json(updateSchedule)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params

      const schedule = await Schedule.findByIdAndDelete(id)

      if (!schedule) {
        return res.status(401).json({ error: 'Schedule not found.' })
      }

      res.status(204).send()
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new ScheduleController()
