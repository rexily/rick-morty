import classNames from 'classnames/bind'

import styles from './StatusCircle.module.scss'

const cx = classNames.bind(styles)

const STATUS_COLORS = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
}

export type TStatusesType = keyof typeof STATUS_COLORS

interface ICircleStatusProps {
  status: TStatusesType
}

export const StatusCircle = ({ status = 'unknown' }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status]

  return <div className={cx('circle-status', color)} />
}
