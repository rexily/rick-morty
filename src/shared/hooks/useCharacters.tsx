import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { getCharacters } from '@/api'
import type { CharacterFilters, CharacterType } from '@/shared/types'
import { NetworkError, useDebounce } from '@/shared'

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: null,
    gender: null,
    species: null
  })
  const debouncedName = useDebounce(filters.name)

  const handleFilterChange = <K extends keyof CharacterFilters>(
    key: K,
    value: CharacterFilters[K]
  ) => {
    setFilters((prev) => {
      const next = { ...prev }
      next[key] = value
      return next
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const requestCharacters = async () => {
      toast.dismiss()
      try {
        setIsLoading(true)
        const receivedCharacters = await getCharacters(
          {
            ...filters,
            name: debouncedName
          },
          controller.signal
        )
        if (!controller.signal.aborted) {
          setCharacters(receivedCharacters)
        }
      } catch (error) {
        if (controller.signal.aborted || axios.isCancel(error)) {
          return
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setCharacters([])
          return
        }
        setCharacters([])
        toast.custom(<NetworkError close={() => toast.dismiss()} />, {
          duration: Infinity
        })
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    requestCharacters()

    return () => {
      controller.abort()
    }
  }, [debouncedName, filters.status, filters.gender, filters.species])

  return {
    characters,
    isLoading,
    filters,
    handleFilterChange
  }
}