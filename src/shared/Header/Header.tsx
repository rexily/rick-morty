import { Link } from 'react-router'
import { LogoBlack } from '@/assets/icons'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { LanguageToggle } from '@/shared'

const cx = classNames.bind(styles)

export const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header__inner')}>
        <Link to='/'>
          <LogoBlack />
        </Link>

        <LanguageToggle />
      </div>
    </header>
  )
}
