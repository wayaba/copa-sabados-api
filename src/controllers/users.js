import { UserModel } from '../models/users.js'

export class UserController {
  static async getAll(req, res) {
    const result = await UserModel.find()
    return res.json(result)
  }
}
