import { Router } from 'express'

import { TeamController } from '../controllers/teams.js'

export const teamsRouter = Router()

teamsRouter.get('/', TeamController.getAll)
