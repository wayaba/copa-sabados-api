import jwt from 'jsonwebtoken'
import { EnvironmentVars } from '../config/env.js'
import { messages } from '../utils/messages.js'

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: messages.error.noTokenProvided })
  }

  jwt.verify(token, EnvironmentVars.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: messages.error.notAuthorized })
    }
    req.userId = decoded.id
    next()
  })
}
