import { Link } from 'react-router'
import { ArrowLeft } from '@/assets/icons'

import classNames from 'classnames/bind'
import styles from './CharacterInfo.module.scss'
import { CharacterCard } from '@/widgets'
import { RickSanchez } from '@/constants'

const cx = classNames.bind(styles)

export const CharacterInfo = () => {
  return (
    <div className={cx('character-info')}>
      <Link
        to='/'
        className={cx('character-info__back')}
      >
        <ArrowLeft />
        <span>GO BACK</span>
      </Link>

      <CharacterCard
        character={RickSanchez}
      />
    </div>
  )
}
