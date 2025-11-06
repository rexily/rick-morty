import React from 'react'
import PortalPng from '@/assets/rick-and-morty-portal.png'

import classNames from 'classnames/bind'
import styles from './Loader.module.scss'

const cx = classNames.bind(styles)

interface ILoaderProps {
  size: 'small' | 'large'
  text?: string
}

export const Loader: React.FC<ILoaderProps> = ({ size, text }) => {
  return (
    <div className={cx('loader')}>
      <img
        src={PortalPng}
        alt='Loading'
        className={cx('loader__image', `loader__image--${size}`)}
      />
      <div className={cx('loader__text')} >
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}


