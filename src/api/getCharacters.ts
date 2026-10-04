import axios from 'axios'
const baseURL = 'https://rickandmortyapi.com/api'
const baseURLFake = 'https://rickandmortyapifake.com/api'

const axiosInstance = axios.create({ baseURL })

const transformApiData  = (list) => {
  return list.map((item) => {
    return {
      ...item,
      gender: item.gender.toLowerCase(),
      species: item.species.toLowerCase(),
      status: item.status.toLowerCase()
    }
  })
}

export const getCharacters = async () => {
  // debugger
  try {
    const response = await axiosInstance({ url: 'character', method: 'get' })
    return transformApiData(response.data.results)
  } catch (error) {
    console.log('ERROR - ', error)
    return { error }
  }
}
