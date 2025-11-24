import classNames from 'classnames/bind'

import { SearchIcon } from '@/assets/icons'
import { Input } from '@/shared/Input/Input'
import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Input
          placeholder='Filter by name...'
          icon={<SearchIcon />}
        />

        <Input
          placeholder='Filter by name...'
          value='Morty Smith'
        />

        <Input
          variant='underlined'
          placeholder='Enter name...'
          value='Rick Sanchez'
        />
      </div>
    </div>
  )
}
