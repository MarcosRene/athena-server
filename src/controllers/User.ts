import { Request, Response } from 'express'

import { User } from '../models/User'

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.find({})

      if (!users) {
        return res.status(400).json({ error: 'User not found.' })
      }

      res.status(201).json(users)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, email, password, confirm_password } = req.body

      const userExists = await User.findOne({
        email,
      })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }

      const user = await User.create({
        name,
        email,
        password,
        confirm_password,
      })

      res.status(201).json(user)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const user = await User.findById(id)

      if (!user) {
        return res.status(400).json({ error: 'User not found.' })
      }

      res.status(201).json(user)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new UserController()
