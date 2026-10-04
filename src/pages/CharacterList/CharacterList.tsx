import classNames from 'classnames/bind'

import styles from './CharacterList.module.scss'
import { CharacterCard, Filter } from '@/widgets'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '@/shared'
import type { CharacterType } from '@/shared/types'
import { getCharacters } from '@/api'
import { NetworkError } from '@/shared/NetworkError/NetworkError'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const request = async () => {
      const response = await getCharacters()

      console.log('USE EFFECT LOG', response)
      if (response.length) setCharacters(response)

      // setCharacters(response)
      if (response.error.isAxiosError) {
        // toast(response.error.message)
        toast.custom(
          <NetworkError
            close={() => {
              toast.dismiss()
            }}
            text={response.error.message}
          />,
          { duration: Infinity }
        )
        setCharacters([])
      }
    }
    request()
    setIsLoading(false)
  }, [])

  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Filter />
        <div>
          {/*<button onClick={notify}>Make me a toast</button>*/}
          <Toaster position='bottom-right' />
        </div>

        {isLoading && <Loader size='large' />}

        <div className={cx('character-list__list')}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
