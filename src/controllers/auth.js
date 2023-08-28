import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { EnvironmentVars } from '../config/env.js'
import { messages } from '../utils/messages.js'
import { UserModel } from '../models/users.js'

export class AuthController {
  static async getAll(req, res) {
    const result = await UserModel.find()
    return res.json(result)
  }

  static async signin(req, res) {
    const { username, password } = req.body
    try {
      const user = await UserModel.findOne({ username: username })
      if (user) {
        const passwordIsValid = bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
          return res
            .status(404)
            .send({ message: messages.error.userOrPassWrong })
        }

        const token = jwt.sign({ id: user.id }, EnvironmentVars.SECRET, {
          expiresIn: 86400 // 24 hours
          //expiresIn: 60 //1 minuto
          //expiresIn: 28800 // 8 horas
        })

        return res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        })
      } else {
        return res.status(404).send({ message: messages.error.userOrPassWrong })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
