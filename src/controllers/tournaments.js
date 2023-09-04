import { TournamentModel } from '../models/tournaments.js'

export class TournamentController {
  static async getAll(req, res) {
    const result = await TournamentModel.find()
    return res.json(result)
  }

  static async getPositions(req, res) {
    const targetTournamentId = '64e8bcb04a07c0312d29df8a'
    const result = await TournamentModel.aggregate([
      {
        $match: {
          _id: targetTournamentId
        }
      },
      {
        $unwind: '$matches'
      },
      {
        $lookup: {
          from: 'matches',
          localField: 'matches',
          foreignField: '_id',
          as: 'match_details'
        }
      },
      {
        $unwind: '$match_details'
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'match_details.team1',
          foreignField: '_id',
          as: 'team1'
        }
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'match_details.team2',
          foreignField: '_id',
          as: 'team2'
        }
      },
      {
        $unwind: '$team1'
      },
      {
        $unwind: '$team2'
      },
      {
        $lookup: {
          from: 'players',
          localField: 'team1.players',
          foreignField: '_id',
          as: 'team1.players'
        }
      },
      {
        $lookup: {
          from: 'players',
          localField: 'team2.players',
          foreignField: '_id',
          as: 'team2.players'
        }
      },
      {
        $project: {
          players: {
            $concatArrays: ['$team1.players', '$team2.players']
          }
        }
      },
      {
        $unwind: '$players'
      },
      {
        $group: {
          _id: '$players',
          total_points: {
            $sum: {
              $switch: {
                branches: [
                  { case: { $eq: ['$players.team1.result', 'W'] }, then: 4 },
                  { case: { $eq: ['$players.team1.result', 'T'] }, then: 2 },
                  { case: { $eq: ['$players.team1.result', 'L'] }, then: 1 },
                  { case: true, then: 0 }
                ]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: '_id',
          as: 'player_details'
        }
      },
      {
        $unwind: '$player_details'
      },
      {
        $project: {
          player_id: '$player_details._id',
          player_name: '$player_details.name',
          total_points: 1
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
