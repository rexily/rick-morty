import { useState } from 'react'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { CrossIcon, EditIcon, OkIcon } from '@/assets/icons'
import { Input, Select, StatusCircle } from '@/shared'

import styles from './CharacterCard.module.scss'
import { useStatuses } from '@/constants'

const cx = classNames.bind(styles)

interface ICharacter {
  name: string
  gender: string
  species: string
  location: { name: string }
  status: string
  image: string
}

type CharacterValuesType = Pick<ICharacter, 'name' | 'status'> & {
  location: string
}

interface ICharacterCard {
  character: ICharacter
}

export const CharacterCard = ({ character }: ICharacterCard) => {
  const {
    name,
    gender,
    species,
    status,
    image,
    location: { name: locationName }
  } = character

  const { t } = useTranslation('common')

  const statusOptions = useStatuses()

  const [isEditable, setIsEditable] = useState<boolean>(false)

  const [characterValues, setCharacterValues] = useState<CharacterValuesType>({
    name,
    status,
    location: locationName
  })

  const handleEdit = () => {
    setIsEditable((prevState) => !prevState)
  }

  const handleReset = () => {
    setIsEditable(false)
    setCharacterValues({ name, status, location: locationName })
  }

  return (
    <div className={cx('card')}>
      <img
        alt='Character photo'
        className={cx('card__photo')}
        src={image}
      />

      {isEditable ? (
        <span className={cx('card__apply')}>
          <OkIcon onClick={handleEdit} />
          <CrossIcon onClick={handleReset} />
        </span>
      ) : (
        <span className={cx('card__edit')}>
          <EditIcon onClick={handleEdit} />
        </span>
      )}

      <div className={cx('card__description')}>
        {isEditable ? (
          <Input
            className={cx('card__name')}
            variant='underlined'
            onChange={(newValue) => {
              setCharacterValues((prevState) => ({
                ...prevState,
                name: newValue
              }))
            }}
            value={characterValues.name}
            placeholder={t(`character.name`)}
          />
        ) : (
          <span className={cx('card__name')}>{characterValues.name}</span>
        )}

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>{t('character.gender')}</span>
          <span className={cx('card__value')}>{t(`gender.${gender}`)}</span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>{t('character.species')}</span>
          <span className={cx('card__value')}>{t(`species.${species}`)}</span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>{t('character.location')}</span>

          {isEditable ? (
            <Input
              className={cx('card__input')}
              variant='underlined'
              onChange={(newValue) => {
                setCharacterValues((prevState) => ({
                  ...prevState,
                  location: newValue
                }))
              }}
              value={characterValues.location}
              placeholder={t(`character.location`)}
            />
          ) : (
            <span className={cx('card__location')}>
              {characterValues.location}
            </span>
          )}
        </div>

        <div className={cx('card__column')}>
          <span className={cx('card__label')}>{t('character.status')}</span>

          {isEditable ? (
            <Select
              placeholder={t('character.status')}
              size='small'
              OptionComponent={({ option }) => {
                return (
                  <span className={cx('card__status')}>
                    <span>{option.label}</span>{' '}
                    <StatusCircle status={option.value} />
                  </span>
                )
              }}
              value={characterValues.status}
              options={statusOptions}
              onChange={(newValue) => {
                setCharacterValues((prevState) => ({
                  ...prevState,
                  status: newValue
                }))
              }}
            />
          ) : (
            <span className={cx('card__status')}>
              <span>{t(`status.${characterValues.status}`)}</span>
              <StatusCircle status={characterValues.status} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
