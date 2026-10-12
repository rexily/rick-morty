export type GenderTypes = 'male' | 'female' | 'unknown' | 'genderless'
export type StatusTypes = 'alive' | 'dead' | 'unknown'
export type SpeciesTypes =
  | 'human'
  | 'alien'
  | 'humanoid'
  | 'animal'
  | 'robot'
  | 'cronenberg'
  | 'mythology'
  | 'disease'
  | 'unknown'


export type CharacterType = {
  name: string
  id: number
  image: string
  location: string
  gender: GenderTypes
  species: SpeciesTypes
  status: StatusTypes
}