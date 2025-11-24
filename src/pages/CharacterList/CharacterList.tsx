import classNames from 'classnames/bind'

import { SearchIcon } from '@/assets/icons'
import { Input } from '@/shared'
import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Input
          value=''
          placeholder='Filter by name...'
          icon={<SearchIcon />}
          onChange={() => ''}
        />

        <Input
          value='Morty Smith'
          placeholder='Filter by name...'
          onChange={() => ''}
        />

        <Input
          variant='underlined'
          placeholder='Enter name...'
          value='Rick Sanchez'
          onChange={() => ''}
        />
      </div>
    </div>
  )
}
