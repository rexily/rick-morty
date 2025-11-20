import classNames from 'classnames/bind'

import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/constants'

import { Select, StatusCircle } from '@/shared/'

import styles from './CharacterList.module.scss'

const cx = classNames.bind(styles)

export const CharacterList = () => {
  return (
    <div className={cx('character-list')}>
      <div className={cx('character-list__inner')}>
        <Select
          size='small'
          placeholder='Status'
          value='alive'
          options={STATUS_OPTIONS}
          SelectOptionComponent={({ label, value }) => (
            <>
              {label}
              <StatusCircle status={value} />
            </>
          )}
        />

        <Select
          size='default'
          placeholder='Gender'
          options={GENDER_OPTIONS}
        />

        <Select
          size='default'
          placeholder='Species'
          options={SPECIES_OPTIONS}
        />
      </div>
    </div>
  )
}
