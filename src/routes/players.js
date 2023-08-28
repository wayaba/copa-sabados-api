import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { PlayerController } from '../controllers/players.js'

export const playersRouter = Router()

playersRouter.get('/', [verifyToken], PlayerController.getAll)
playersRouter.get('/positions', PlayerController.getPositions)
