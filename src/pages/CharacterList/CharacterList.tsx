import classNames from 'classnames/bind'

import styles from './CharacterList.module.scss'
import { CharacterCard, Filter } from '@/widgets'
import { MortySmith, RickSanchez, SummerSmith } from '@/constants'

const cx = classNames.bind(styles)

export const CharacterList = () => {


  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>

        <Filter />

        <CharacterCard character={RickSanchez} />
        <CharacterCard character={MortySmith} />
        <CharacterCard character={SummerSmith} />
      </div>
    </div>
  )
}
