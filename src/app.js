import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { connectToMongo } from './config/db.js'
import { playersRouter } from './routes/players.js'
import { teamsRouter } from './routes/teams.js'
import { matchesRouter } from './routes/matches.js'
import { tournamentsRouter } from './routes/tournaments.js'

const app = express()
app.use(json())

app.use(corsMiddleware())
app.disable('x-powered-by')

connectToMongo()

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.use('/players', playersRouter)
app.use('/teams', teamsRouter)
app.use('/matches', matchesRouter)
app.use('/tournaments', tournamentsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
