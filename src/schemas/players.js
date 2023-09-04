import z from 'zod'

const playerSchema = z.object({
  name: z.string({
    invalid_type_error: 'Player name must be a string',
    required_error: 'Player name is required.'
  }),
  lastName: z.string({
    invalid_type_error: 'Player last name must be a string'
  }),
  nickname: z.string({
    invalid_type_error: 'Player nickname must be a string'
  })
})

export function validatePlayer(input) {
  return playerSchema.safeParse(input)
}

export function validatePartialPlayer(input) {
  return playerSchema.partial().safeParse(input)
}
