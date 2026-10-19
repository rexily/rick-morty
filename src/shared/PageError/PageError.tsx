import classNames from 'classnames/bind'
import type { FallbackProps } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import styles from './PageError.module.scss'

const cx = classNames.bind(styles)

export const PageError = ({ resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation('common')
  return (
    <div className={cx('page-error')}>
      <p>
        {t('request.error.failedToShowPage', {
          postProcess: 'capitalizeFirst'
        })}
      </p>
      <button
        type='button'
        onClick={resetErrorBoundary}
      >
        {t('request.error.tryAgain', {
          postProcess: 'capitalizeFirst'
        })}
      </button>
    </div>
  )
}
