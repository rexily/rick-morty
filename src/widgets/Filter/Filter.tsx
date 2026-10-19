import classNames from 'classnames/bind'

import styles from './Filter.module.scss'
import { Input, Select } from '@/shared'
import { useTranslation } from 'react-i18next'
import { useGenders, useSpecies, useStatuses } from '@/constants'
import { SearchIcon } from '@/assets/icons'
import type { CharacterFilters } from '@/shared/types'

const cx = classNames.bind(styles)

type FilterProps = {
  filters: CharacterFilters
  onFilterChange: <K extends keyof CharacterFilters>(
    key: K,
    value: CharacterFilters[K]
  ) => void
}

export const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const { t } = useTranslation('common')

  const { name, species, gender, status } = filters

  const genderOptions = useGenders({ capitalize: true })
  const speciesOptions = useSpecies({ capitalize: true })
  const statusOptions = useStatuses({ capitalize: true })

  return (
    <div className={cx('filter')}>
      <Input
        icon={<SearchIcon />}
        value={name}
        onChange={(newValue) => {
          onFilterChange('name', newValue)
        }}
        placeholder={`${t('filter.filterByName', { postProcess: 'capitalizeFirst' })}...`}
      />

      <Select
        size='medium'
        placeholder={t('character.species', { postProcess: 'capitalizeFirst' })}
        onChange={(newValue) => {
          onFilterChange('species', newValue)
        }}
        value={species}
        options={speciesOptions}
      />

      <Select
        value={gender}
        onChange={(newValue) => {
          onFilterChange('gender', newValue)
        }}
        placeholder={t('character.gender', { postProcess: 'capitalizeFirst' })}
        options={genderOptions}
      />

      <Select
        value={status}
        onChange={(newValue) => {
          onFilterChange('status', newValue)
        }}
        placeholder={t('character.status', { postProcess: 'capitalizeFirst' })}
        options={statusOptions}
      />
    </div>
  )
}
