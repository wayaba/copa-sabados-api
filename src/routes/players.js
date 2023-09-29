import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { PlayerController } from '../controllers/players.js'

export const playersRouter = Router()

playersRouter.get('/', [verifyToken], PlayerController.getAll)
playersRouter.post('/', [verifyToken], PlayerController.create)
playersRouter.get('/:id', [verifyToken], PlayerController.getById)
playersRouter.put('/:id', [verifyToken], PlayerController.update)
playersRouter.delete('/:id', [verifyToken], PlayerController.delete)
