import classNames from 'classnames/bind'

import { CloseIcon } from '@/assets/icons'
import { useTranslation } from 'react-i18next'

import styles from './NetworkError.module.scss'

const cx = classNames.bind(styles)

export const NetworkError = ({ close }) => {
  const { t } = useTranslation('common')

  return (
    <div className={cx('network-error')}>
      <button
        type='button'
        onClick={close}
      >
        <CloseIcon />
      </button>
      <div>
        <b>{t(`request.error.error`, { postProcess: 'capitalizeFirst' })}</b>
        <p>
          {t(`request.error.failedLoadingData`, {
            postProcess: 'capitalizeFirst'
          })}
        </p>
      </div>
    </div>
  )
}
