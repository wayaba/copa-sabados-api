import z from 'zod'

const matchSchema = z.object({
  date: z.coerce.date().min(new Date(1920, 0, 1), {
    message: 'Date cannot go past January 1 1920'
  }),
  matchNumber: z.number().min(0).max(200).default(1),
  result: z.enum(['W', 'D', 'L'], {
    required_error: 'Match result is required.'
  }),
  tournament: z.string({
    required_error: 'Id tournament is required.'
  }),
  team: z.string({
    required_error: 'Id team is required.'
  })
})

export function validateMatch(input) {
  return matchSchema.safeParse(input)
}

export function validatePartialMatch(input) {
  return matchSchema.partial().safeParse(input)
}
