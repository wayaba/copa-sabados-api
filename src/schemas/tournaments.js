import z from 'zod'

const tournamentSchema = z.object({
  name: z.string({
    invalid_type_error: 'Tournament name must be a string',
    required_error: 'Tournament name is required.'
  }),
  win: z.number().min(0).max(100).default(3),
  draw: z.number().min(0).max(100).default(1),
  lose: z.number().min(0).max(100).default(0)
})

export function validateTournament(input) {
  return tournamentSchema.safeParse(input)
}

export function validatePartialTournament(input) {
  return tournamentSchema.partial().safeParse(input)
}
