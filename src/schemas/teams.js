import z from 'zod'

const teamSchema = z.object({
  name: z.string({
    invalid_type_error: 'Team name must be a string',
    required_error: 'Team name is required.'
  }),
  players: z.string().array().nonempty({
    message: 'Team players can not be empty'
  })
})

export function validateTeam(input) {
  return teamSchema.safeParse(input)
}

export function validatePartialTeam(input) {
  return teamSchema.partial().safeParse(input)
}
