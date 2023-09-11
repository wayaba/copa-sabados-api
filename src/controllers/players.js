import { PlayerModel } from '../models/players.js'
import { validatePartialPlayer, validatePlayer } from '../schemas/players.js'

export class PlayerController {
  static async getAll(req, res) {
    const result = await PlayerModel.getAll()
    return res.json(result)
  }

  static async create(req, res) {
    const result = validatePlayer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const savedPlayer = await PlayerModel.create({ input: result.data })
      res.status(201).json(savedPlayer)
    } catch (error) {
      res.status(400).json({ error: JSON.parse(error.message) })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const player = await PlayerModel.getById(id)
      if (player) return res.json(player)
      res.status(404).json({ message: 'Player not found' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update(req, res) {
    const result = validatePartialPlayer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedPlayer = await PlayerModel.update(id, { input: result.data })
    return res.json(updatedPlayer)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await PlayerModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Player not found' })
    }

    return res.json({ message: 'Player deleted' })
  }
}
