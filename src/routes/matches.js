import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { MatchController } from '../controllers/matches.js'

export const matchesRouter = Router()

matchesRouter.get('/', MatchController.getAll)
matchesRouter.post('/', [verifyToken], MatchController.create)
matchesRouter.get('/:id', [verifyToken], MatchController.getById)
matchesRouter.put('/:id', [verifyToken], MatchController.update)
matchesRouter.delete('/:id', [verifyToken], MatchController.delete)
