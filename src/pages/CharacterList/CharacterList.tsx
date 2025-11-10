import RickAndMortyLogoPng from '@/assets/rick-and-morty-logo.png'
import Loader from '@/shared/Loader/Loader'

import classNames from 'classnames/bind'
import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  return (
    <div className={cx('character-list')}>
      <img
        src={RickAndMortyLogoPng}
        alt='Rick and Morty Logo'
      />
      <Loader
        size='large'
        text='Loading characters...'
      />
    </div>
  )
}
