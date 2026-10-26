import axios from 'axios'

import {
  type GetCharactersResponse,
  type GetCharactersResult,
  transformApiCharacter
} from '@/api/helpers'
import type { CharacterFilters } from '@/shared/types'

const baseURL = 'https://rickandmortyapi.com/api'

const axiosInstance = axios.create({ baseURL })

export const getCharacters = async (
  filters: CharacterFilters,
  page: number,
  signal?: AbortSignal
): Promise<GetCharactersResult> => {
  const { data } = await axiosInstance.get<GetCharactersResponse>(
    '/character',
    {
      params: { ...filters, page },
      signal
    }
  )
  return {
    characters: data.results.map(transformApiCharacter),
    hasNextPage: data.info.next !== null
  }
}
