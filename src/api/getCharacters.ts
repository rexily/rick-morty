import axios from 'axios'

import { type ApiCharacter, transformApiCharacter } from '@/api/helpers'
import type { CharacterFilters } from '@/shared/types'

const baseURL = 'https://rickandmortyapi.com/api'

const axiosInstance = axios.create({ baseURL })

type GetCharactersResponse = {
  results: ApiCharacter[]
}

export const getCharacters = async (filters: CharacterFilters, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<GetCharactersResponse>(
    '/character',
    {
      params: filters,
      signal
    }
  )

  return data.results.map(transformApiCharacter)
}