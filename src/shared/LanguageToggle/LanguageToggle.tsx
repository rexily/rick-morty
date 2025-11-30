import React from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'
import styles from './LanguageToggle.module.scss'

const cx = classNames.bind(styles)

type Lang = 'en' | 'ru'

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation()

  const current = i18n.language as Lang

  const toggleLang = () => {
    const next: Lang = current === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(next)
    i18next.changeLanguage(next)
  }

  return (
    <button
      onClick={toggleLang}
      className={cx('lang-toggle')}
    >
      {current === 'en' && 'РУ'}
      {current === 'ru' && 'EN'}
    </button>
  )
}
