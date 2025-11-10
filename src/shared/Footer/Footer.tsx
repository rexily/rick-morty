import classNames from 'classnames/bind'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

export const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <span>Made with love by Rexily</span>
    </footer>
  )
}
