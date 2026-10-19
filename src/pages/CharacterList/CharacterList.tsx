import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import axios from 'axios'

import { getCharacters } from '@/api'
import { Loader, NetworkError, useDebounce } from '@/shared'
import type { CharacterFilters, CharacterType } from '@/shared/types'
import { CharacterCard, Filter } from '@/widgets'

import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: null,
    gender: null,
    species: null
  })

  const debouncedName = useDebounce(filters.name, 400)

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

    void requestCharacters()

    return () => {
      controller.abort()
    }
  }, [debouncedName, filters.status, filters.gender, filters.species])

  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Filter
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {isLoading ? (
          <Loader size='large' />
        ) : (
          <ol className={cx('character-list__list')}>
            {characters.map((character) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
