import { Request, Response } from 'express'
import crypto from 'crypto'
import { isAfter } from 'date-fns'

import { Schedule } from '../models/Schedule'
import { User } from '../models/User'

class ScheduleController {
  async index(req: Request, res: Response) {
    try {
      const { subject } = req.query

      const filteredSubject = subject
        ? { subject: new RegExp(`${subject}`, 'i') }
        : {}

      const schedules = await Schedule.find(filteredSubject).populate(
        'userId',
        '_id name'
      )

      const allSchedules = schedules.map((schedule) => {
        const {
          _id,
          identifier,
          subject,
          description,
          userId: user,
          date,
        } = schedule

        const isOldScheduling = isAfter(new Date(), String(date))

        return {
          _id,
          identifier,
          subject,
          description,
          userId: user._id,
          teacher: user,
          date,
          oldScheduling: isOldScheduling,
        }
      })

      res.status(200).json(allSchedules)
    } catch (error) {
      res.status(500).json()
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { subject, description, userId, date } = req.body

      const user = await User.findById(userId)

      if (!user) {
        return res.status(401).json({ error: 'User not found.' })
      }

      const schedule = await Schedule.create({
        identifier: `#${crypto.randomBytes(4).toString('hex')}`,
        subject,
        description,
        userId,
        date,
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

      res.status(200).json(schedule)
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const schedule = await Schedule.findByIdAndDelete(id)

      if (!schedule) {
        return res.status(401).json({ error: 'Schedule not found.' })
      }

      res.status(200).send()
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new ScheduleController()
