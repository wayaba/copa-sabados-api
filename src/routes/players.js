import { Router } from 'express'

import { PlayerController } from '../controllers/players.js'

export const playersRouter = Router()

playersRouter.get('/', PlayerController.getAll)
