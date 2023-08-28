import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { TournamentController } from '../controllers/tournaments.js'

export const tournamentsRouter = Router()

tournamentsRouter.get('/', [verifyToken], TournamentController.getAll)
