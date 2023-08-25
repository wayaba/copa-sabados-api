import { PlayerModel } from '../models/players.js'

export class PlayerController {
  static async getAll(req, res) {
    const result = await PlayerModel.find()
    return res.json(result)
  }
}
