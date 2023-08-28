import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { MatchController } from '../controllers/matches.js'

export const matchesRouter = Router()

matchesRouter.get('/', [verifyToken], MatchController.getAll)
