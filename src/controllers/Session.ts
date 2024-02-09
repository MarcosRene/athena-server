import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { authConfig } from '../config/auth'

import { User } from '../models/User'

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return res.status(401).json({ error: 'User not found.' })
      }

      if (!(req.body.password === user?.password)) {
        return res.status(401).json({ error: 'Password does not match' })
      }

      const { _id: id, name, email, avatar } = user

      return res.json({
        user: {
          id,
          name,
          email,
          avatar,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (error) {
      res.sendStatus(500)
    }
  }
}

export default new SessionController()
