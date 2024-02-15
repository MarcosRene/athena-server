import { Request, Response } from 'express'

import { User } from '../models/User'

class UserController {
  async index(req: Request, res: Response) {
    try {
      const { role } = req.query

      const filteredRole = role ? { role } : {}

      const users = await User.find(filteredRole)

      res.status(201).json(users)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const userExists = await User.findOne({
        email: req.body.email,
      })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }

      const user = await User.create(req.body)

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
        return res.status(401).json({ error: 'User not found.' })
      }

      res.status(201).json(user)
    } catch (error) {
      res.sendStatus(500)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const imagePath = req.file?.filename
      const { id } = req.params

      const user = await User.findById(id)

      if (!user) {
        return res.status(401).json({ error: 'User not found.' })
      }

      if (req.body.email !== user?.email) {
        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
          return res.status(400).json({ error: 'User already exists.' })
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...req.body, avatar: imagePath },
        {
          new: true,
        }
      )

      res.status(201).json(updatedUser)
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new UserController()
