import type { CharacterType } from '@/shared/types'
import { type ApiCharacter } from '@/api'

export const transformApiCharacter = (
  character: ApiCharacter
): CharacterType => {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    location: character.location.name,
    gender: character.gender.toLowerCase(),
    species: character.species.toLowerCase(),
    status: character.status.toLowerCase()
  }
}
