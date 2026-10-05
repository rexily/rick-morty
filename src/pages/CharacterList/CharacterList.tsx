import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import toast, { Toaster } from 'react-hot-toast'

import { getCharacters } from '@/api'
import { Loader } from '@/shared'
import { NetworkError } from '@/shared/NetworkError/NetworkError'
import type { CharacterType } from '@/shared/types'
import { CharacterCard, Filter } from '@/widgets'

import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const requestCharacters = async () => {
      try {
        setIsLoading(true)
        const receivedCharacters = await getCharacters()

        setCharacters(receivedCharacters)

      } catch {
        setCharacters([])

        toast.custom(
          <NetworkError close={() => toast.dismiss()} />,
          { duration: Infinity }
        )
      } finally {
        setIsLoading(false)
      }
    }

    void requestCharacters()
  }, [])

  return (
    <div className={cx('character-list')}>
      <Toaster position='bottom-right' />

      <div className={cx('character-list__inner')}>
        <Filter />

        {isLoading ? (
          <Loader size='large' />
        ) : (
          <div className={cx('character-list__list')}>
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
