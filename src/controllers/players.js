import { PlayerModel } from '../models/players.js'

export class PlayerController {
  static async getAll(req, res) {
    const result = await PlayerModel.find()
    return res.json(result)
  }

  static async getPositions(req, res) {
    const result = PlayerModel.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: '_id',
          foreignField: 'players',
          as: 'player_teams'
        }
      },
      {
        $unwind: '$player_teams'
      },
      {
        $lookup: {
          from: 'matches',
          let: { teamId: '$player_teams._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ['$team1', '$$teamId'] },
                    { $eq: ['$team2', '$$teamId'] }
                  ]
                }
              }
            }
          ],
          as: 'player_teams.matches'
        }
      },
      {
        $addFields: {
          total_points: {
            $sum: {
              $switch: {
                branches: [
                  { case: { $eq: ['$player_teams.result', 'W'] }, then: 4 },
                  { case: { $eq: ['$player_teams.result', 'T'] }, then: 2 },
                  { case: { $eq: ['$player_teams.result', 'L'] }, then: 1 },
                  { case: true, then: 0 }
                ]
              }
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          player_name: { $first: '$name' },
          total_points: { $sum: '$total_points' }
        }
      },
      {
        $sort: {
          total_points: -1
        }
      }
    ])

    return res.json(result)
  }
}
