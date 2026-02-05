import classNames from 'classnames/bind'

import styles from './Filter.module.scss'
import { Input, Select } from '@/shared'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGenders, useSpecies, useStatuses } from '@/constants'

const cx = classNames.bind(styles)

export const Filter = () => {
  const { t } = useTranslation('common')

  const [filterCombined, setFilterCombined] = useState({
    searchValue: '',
    species: null,
    gender: null,
    status: null
  })

  const genderOptions = useGenders({ capitalize: true })
  const speciesOptions = useSpecies({ capitalize: true })
  const statusOptions = useStatuses({ capitalize: true })

  return (
    <div className={cx('filter')}>
      <Input
        value={filterCombined.searchValue}
        onChange={(newValue) => {
          setFilterCombined((prevState) => ({
            ...prevState,
            searchValue: newValue
          }))
        }}
        placeholder={`${t('filter.filterByName', { postProcess: 'capitalizeFirst' })}...`}
      />

      <Select
        size='medium'
        placeholder={t('character.species', { postProcess: 'capitalizeFirst' })}
        onChange={(newValue) => {
          setFilterCombined((prevState) => ({
            ...prevState,
            species: newValue
          }))
        }}
        value={filterCombined.species}
        options={speciesOptions}
      />

      <Select
        value={filterCombined.gender}
        onChange={(newValue) => {
          setFilterCombined((prevState) => ({ ...prevState, gender: newValue }))
        }}
        placeholder={t('character.gender', { postProcess: 'capitalizeFirst' })}
        options={genderOptions}
      />

      <Select
        value={filterCombined.status}
        onChange={(newValue) => {
          setFilterCombined((prevState) => ({ ...prevState, status: newValue }))
        }}
        placeholder={t('character.status', { postProcess: 'capitalizeFirst' })}
        options={statusOptions}
      />
    </div>
  )
}
