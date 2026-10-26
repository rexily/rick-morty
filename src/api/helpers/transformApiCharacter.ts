import type {
  CharacterType,
  GenderTypes,
  SpeciesTypes,
  StatusTypes
} from '@/shared/types'
import type { ApiCharacter } from '@/api/helpers/types'

export const transformApiCharacter = (
  character: ApiCharacter
): CharacterType => {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    location: character.location.name,
    gender: character.gender.toLowerCase() as GenderTypes,
    species: character.species.toLowerCase() as SpeciesTypes,
    status: character.status.toLowerCase() as StatusTypes
  }
}
