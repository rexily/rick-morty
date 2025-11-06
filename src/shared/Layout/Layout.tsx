import { Outlet } from 'react-router'
import { Header, Footer } from '@/shared'

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
