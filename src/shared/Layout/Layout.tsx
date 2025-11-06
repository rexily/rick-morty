import { Outlet } from 'react-router'
import { Header } from '@/shared/Header/Header.tsx'
import { Footer } from '@/shared/Footer/Footer'

import classNames from 'classnames/bind'
import styles from './Layout.module.scss'

const cx = classNames.bind(styles)

export const Layout = () => (
  <div className={cx('layout')}>
    <Header />
    <main className={cx('main')}>
      <div className={cx('main__inner')}>
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
)
