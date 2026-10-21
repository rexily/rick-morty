import classNames from 'classnames/bind'

import { Loader, useCharacters } from '@/shared'
import { CharacterCard, Filter } from '@/widgets'

import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  const { characters, isLoading, filters, handleFilterChange } = useCharacters()

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