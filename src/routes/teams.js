import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { TeamController } from '../controllers/teams.js'

export const teamsRouter = Router()

teamsRouter.get('/', [verifyToken], TeamController.getAll)
