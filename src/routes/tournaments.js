import { Router } from 'express'

import { TournamentController } from '../controllers/tournaments.js'

export const tournamentsRouter = Router()

tournamentsRouter.get('/', TournamentController.getAll)
