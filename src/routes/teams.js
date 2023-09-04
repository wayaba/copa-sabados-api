import { Router } from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { TeamController } from '../controllers/teams.js'

export const teamsRouter = Router()

teamsRouter.get('/', TeamController.getAll)
teamsRouter.post('/', [verifyToken], TeamController.create)
teamsRouter.get('/:id', [verifyToken], TeamController.getById)
teamsRouter.put('/:id', [verifyToken], TeamController.update)
teamsRouter.delete('/:id', [verifyToken], TeamController.delete)
