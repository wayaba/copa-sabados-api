import { PlayerModel } from '../models/players.js'
import { validatePartialPlayer, validatePlayer } from '../schemas/players.js'

export class PlayerController {
  static async getAll(req, res) {
    const result = await PlayerModel.find()
    return res.json(result)
  }

  static async create(req, res) {
    const result = validatePlayer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newPlayer = new PlayerModel({
      name: result.data.name,
      lastName: result.data.lastName,
      nickname: result.data.nickname
    })

    try {
      const savedPlayer = await newPlayer.save()

      res.status(201).json(savedPlayer)
    } catch (error) {
      res.status(400).json({ error: JSON.parse(error.message) })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const player = await PlayerModel.findById(id)
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

    const playerNewInfo = {
      name: result.data.name,
      lastName: result.data.lastName,
      nickname: result.data.nickname
    }

    const updatedPlayer = await PlayerModel.findOneAndUpdate(
      { _id: id },
      playerNewInfo,
      {
        new: true
      }
    )

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
