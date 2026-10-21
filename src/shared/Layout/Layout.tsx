import { Outlet, useLocation } from 'react-router'
import { Header, Footer, PageError } from '@/shared'

import classNames from 'classnames/bind'
import styles from './Layout.module.scss'
import { ErrorBoundary } from 'react-error-boundary'

const cx = classNames.bind(styles)

export const Layout = () => {
  const location = useLocation()

  return (
    <div className={cx('layout')}>
      <Header />
      <main className={cx('main')}>
        <div className={cx('main__inner')}>
          <ErrorBoundary
            resetKeys={[location.pathname]}
            FallbackComponent={PageError}
          >
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  )
}
