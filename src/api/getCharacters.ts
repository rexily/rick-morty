import axios from 'axios'

import { type ApiCharacter, transformApiCharacter } from '@/api/helpers'

const baseURL = 'https://rickandmortyapi.com/api'

const axiosInstance = axios.create({ baseURL })

type GetCharactersResponse = {
  results: ApiCharacter[]
}

export const getCharacters = async () => {
  const { data } = await axiosInstance.get<GetCharactersResponse>('/character')

  return data.results.map(transformApiCharacter)
}
