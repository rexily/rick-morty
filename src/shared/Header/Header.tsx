import { Link } from 'react-router'
import { LogoBlack } from '@/assets/icons'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

export const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header__inner')} >
        <Link to="/">
          <LogoBlack />
        </Link>
      </div>
    </header>
  )
}
