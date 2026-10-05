import classNames from 'classnames/bind'

import styles from './NetworkError.module.scss'
import { CloseIcon } from '@/assets/icons'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

export const NetworkError = ({ close }) => {
  const { t } = useTranslation('common')

  return (
    <div className={cx('network-error')}>
      <button onClick={close}>
        <CloseIcon />
      </button>
      <span >
        <b>{t(`request.error.error`, { postProcess: 'capitalizeFirst' })}</b>
        <p>
          {t(`request.error.failedLoadingData`, {
            postProcess: 'capitalizeFirst'
          })}
        </p>
      </span>
    </div>
  )
}
