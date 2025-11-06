import { Link } from 'react-router'
import LogoIcon from '@/assets/logo-black.svg?react'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

export const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header__inner')} >
        <Link to="/">
          <LogoIcon />
        </Link>
      </div>
    </header>
  )
}
