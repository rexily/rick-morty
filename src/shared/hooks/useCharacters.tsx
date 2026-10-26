import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { getCharacters } from '@/api'
import type { CharacterFilters, CharacterType } from '@/shared/types'
import { NetworkError, useDebounce } from '@/shared'

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [page, setPage] = useState<number>(1)
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

    if (key !== 'name') {
      setPage(1)
    }
  }

  const goToNextPage = useCallback(() => {
    if (!isLoading && hasNextPage) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, hasNextPage])

  useEffect(() => {
    setPage(1)
  }, [debouncedName])

  useEffect(() => {
    const controller = new AbortController()
    const requestCharacters = async () => {
      toast.dismiss()
      try {
        setIsLoading(true)
        const {
          characters: receivedCharacters,
          hasNextPage: receivedHasNextPage
        } = await getCharacters(
          {
            ...filters,
            name: debouncedName
          },
          page,
          controller.signal
        )
        if (!controller.signal.aborted) {
          setCharacters((prev) =>
            page === 1 ? receivedCharacters : [...prev, ...receivedCharacters]
          )
          setHasNextPage(receivedHasNextPage)
        }
      } catch (error) {
        if (controller.signal.aborted || axios.isCancel(error)) {
          return
        }
        setHasNextPage(false)
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          if (page === 1) {
            setCharacters([])
          }
          return
        }
        if (page === 1) {
          setCharacters([])
        }
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
  }, [debouncedName, filters.status, filters.gender, filters.species, page])

  return {
    characters,
    isLoading,
    filters,
    hasNextPage,
    goToNextPage,
    isFirstPageLoading: isLoading && page === 1,
    handleFilterChange
  }
}
