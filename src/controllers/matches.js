import { MatchModel } from '../models/matches.js'
import { validateMatch } from '../schemas/matches.js'

export class MatchController {
  static async getAll(req, res) {
    const result = await MatchModel.find()
    return res.json(result)
  }

  static async create(req, res) {
    const result = validateMatch(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMatch = new MatchModel({
      date: result.data.date,
      tournament: result.data.tournament,
      team: result.data.team,
      result: result.data.result,
      matchNumber: result.data.matchNumber
    })

    try {
      const savedMatch = await newMatch.save()

      res.status(201).json(savedMatch)
    } catch (error) {
      res.status(400).json({ error: JSON.parse(error.message) })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const match = await MatchModel.findById(id)
      if (match) return res.json(match)
      res.status(404).json({ message: 'Match not found' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update(req, res) {
    const result = validatePartialMatch(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const matchNewInfo = {
      date: result.data.date,
      tournament: result.data.tournament,
      team: result.data.team,
      result: result.data.result,
      matchNumber: result.data.matchNumber
    }

    const updatedMatch = await MatchModel.findOneAndUpdate(
      { _id: id },
      matchNewInfo,
      {
        new: true
      }
    )

    return res.json(updatedMatch)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await MatchModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Match not found' })
    }

    return res.json({ message: 'Match deleted' })
  }
}
