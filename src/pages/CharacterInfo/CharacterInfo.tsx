import { Link } from 'react-router'
import { ArrowLeft } from '@/assets/icons'
import { Loader } from '@/shared'

import classNames from 'classnames/bind'
import styles from './CharacterInfo.module.scss'

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

      <div className={cx('character-info')}>
        <Loader
          size='large'
          text='Loading character card...'
        />
      </div>
    </div>
  )
}
