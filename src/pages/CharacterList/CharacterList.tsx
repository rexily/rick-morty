import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Loader, useCharacters } from '@/shared'
import { CharacterCard, Filter } from '@/widgets'

import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  const {
    characters,
    isLoading,
    hasNextPage,
    filters,
    goToNextPage,
    isFirstPageLoading,
    handleFilterChange
  } = useCharacters()

  const { ref, inView } = useInView({
    rootMargin: '800px'
  })

  useEffect(() => {
    if (inView) {
      goToNextPage()
    }
  }, [inView, goToNextPage])

  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Filter
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        {isFirstPageLoading ? (
          <Loader size='large' />
        ) : (
          <>
            <ol className={cx('character-list__list')}>
              {characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ol>
            {isLoading && <Loader size='small' />}
            {hasNextPage && !isLoading && <div ref={ref} />}
          </>
        )}
      </div>
    </div>
  )
}
