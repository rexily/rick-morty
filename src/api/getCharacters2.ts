import axios from 'axios'
import { transformApiCharacter } from '@/api/helpers'

const baseURL1 = 'https://rickandmortyapi.com/api'
const baseURL = 'fakeurltest.com'


const axiosInstance = axios.create({
  baseURL
})

export type ApiCharacter = {
  id: number
  name: string
  image: string
  location: {
    name: string
    url: string
  }
  gender: string
  species: string
  status: string
  episodes: string[]
}


type GetCharactersResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: ApiCharacter[]
}

export const getCharacters = async () => {
  const { data } =
    await axiosInstance.get<GetCharactersResponse>('/character')

  return data.results.map(transformApiCharacter)
}