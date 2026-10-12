import type {
  CharacterType,
  GenderTypes,
  SpeciesTypes,
  StatusTypes
} from '@/shared/types'

export type ApiCharacter = {
  id: number
  name: string
  image: string
  location: {
    name: string
  }
  gender: string
  species: string
  status: string
}

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
