import classNames from 'classnames/bind';

import styles from './StatusCircle.module.scss'
const cx = classNames.bind(styles)

const STATUS_COLORS = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange'
};

export type TStatusesType = keyof typeof STATUS_COLORS;

export interface ICircleStatusProps {
  status: TStatusesType;
}

export const StatusCircle = ({ status = 'Unknown' }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status];

  return <div className={cx('circle-status', color)} />;
};