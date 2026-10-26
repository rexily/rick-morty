import type { CharacterType } from '@/shared/types'

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
export type GetCharactersResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: ApiCharacter[]
}
export type GetCharactersResult = {
  characters: CharacterType[]
  hasNextPage: boolean
}
