import { TournamentModel } from '../models/tournaments.js'
import {
  validatePartialTournament,
  validateTournament
} from '../schemas/tournaments.js'

export class TournamentController {
  static async getAll(req, res) {
    const result = await TournamentModel.find()
    return res.json(result)
  }

  static async create(req, res) {
    const result = validateTournament(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTournament = new TournamentModel({
      name: result.data.name,
      win: result.data.win,
      draw: result.data.draw,
      lose: result.data.lose
    })

    try {
      const savedTournament = await newTournament.save()

      res.status(201).json(savedTournament)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const tournament = await TournamentModel.findById(id)
      if (tournament) return res.json(tournament)
      res.status(404).json({ message: 'Tournament not found' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update(req, res) {
    const result = validatePartialTournament(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const tournamentNewInfo = {
      name: result.data.name,
      win: result.data.win,
      draw: result.data.draw,
      lose: result.data.lose
    }

    const updatedTournament = await TournamentModel.findOneAndUpdate(
      { _id: id },
      tournamentNewInfo,
      {
        new: true
      }
    )

    return res.json(updatedTournament)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await TournamentModel.findByIdAndDelete(id)

    if (result === false) {
      return res.status(404).json({ message: 'Tournament not found' })
    }

    return res.json({ message: 'Tournament deleted' })
  }

  static async getPositions(req, res) {
    const { name = '2023' } = req.body
    const result = await TournamentModel.aggregate([
      {
        $match: { name: name }
      },
      {
        $lookup: {
          from: 'matches',
          localField: '_id',
          foreignField: 'tournament',
          as: 'matches'
        }
      },
      {
        $unwind: '$matches'
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'matches.team',
          foreignField: '_id',
          as: 'team'
        }
      },
      {
        $unwind: '$team'
      },
      {
        $unwind: '$team.players'
      },
      {
        $group: {
          _id: '$team.players',
          totalPoints: {
            $sum: {
              $switch: {
                branches: [
                  { case: { $eq: ['$matches.result', 'W'] }, then: '$win' },
                  { case: { $eq: ['$matches.result', 'D'] }, then: '$draw' },
                  { case: { $eq: ['$matches.result', 'L'] }, then: '$lose' }
                ],
                default: 0
              }
            }
          },
          played: { $sum: 1 },
          win: {
            $sum: { $cond: [{ $eq: ['$matches.result', 'W'] }, 1, 0] }
          },
          lost: {
            $sum: { $cond: [{ $eq: ['$matches.result', 'L'] }, 1, 0] }
          },
          draw: {
            $sum: { $cond: [{ $eq: ['$matches.result', 'D'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: '_id',
          as: 'player'
        }
      },
      {
        $unwind: '$player'
      },
      {
        $project: {
          _id: '$_id',
          playerName: '$player.name',
          totalPoints: 1,
          played: 1,
          win: 1,
          lost: 1,
          draw: 1
        }
      },
      {
        $sort: { totalPoints: -1 }
      }
    ])
    return res.json(result)
  }
}
