import classNames from 'classnames/bind'

import { SearchIcon } from '@/assets/icons'
import { Input } from '@/shared'
import styles from './CharacterList.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

export const CharacterList = () => {

  const [search, setSearch] = useState('')

  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Input
          value={search}
          placeholder='Filter by name...'
          icon={<SearchIcon />}
          onChange={(value) => setSearch(value)}
        />
      </div>
    </div>
  )
}
