import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { TournamentController } from '../controllers/tournaments.js'

export const tournamentsRouter = Router()

tournamentsRouter.get('/', TournamentController.getAll)
tournamentsRouter.post('/', [verifyToken], TournamentController.create)
tournamentsRouter.get('/:id', [verifyToken], TournamentController.getById)
tournamentsRouter.put('/:id', [verifyToken], TournamentController.update)
tournamentsRouter.delete('/:id', [verifyToken], TournamentController.delete)

tournamentsRouter.post('/positions', TournamentController.getPositions)
