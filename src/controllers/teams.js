import { TeamModel } from '../models/teams.js'
import { validatePartialTeam, validateTeam } from '../schemas/teams.js'

export class TeamController {
  static async getAll(req, res) {
    const result = await TeamModel.find()
    return res.json(result)
  }

  static async create(req, res) {
    const result = validateTeam(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTeam = new TeamModel({
      name: result.data.name,
      players: result.data.players.map((player) => ({ _id: player }))
    })

    try {
      const savedTeam = await newTeam.save()

      res.status(201).json(savedTeam)
    } catch (error) {
      res.status(400).json({ error: JSON.parse(error.message) })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const team = await TeamModel.findById(id)
      if (team) return res.json(team)
      res.status(404).json({ message: 'Team not found' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update(req, res) {
    const result = validatePartialTeam(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const teamNewInfo = {
      name: result.data.name,
      players: result.data.players.map((player) => ({ _id: player }))
    }

    const updatedTeam = await TeamModel.findOneAndUpdate(
      { _id: id },
      teamNewInfo,
      {
        new: true
      }
    )

    return res.json(updatedTeam)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await TeamModel.findByIdAndDelete(id)

    if (result === false) {
      return res.status(404).json({ message: 'Team not found' })
    }

    return res.json({ message: 'Team deleted' })
  }
}
