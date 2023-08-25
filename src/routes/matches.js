import { Router } from 'express'

import { MatchController } from '../controllers/matches.js'

export const matchesRouter = Router()

matchesRouter.get('/', MatchController.getAll)
