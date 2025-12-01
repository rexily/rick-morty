import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { EditIcon } from '@/assets/icons'
import { StatusCircle } from '@/shared'

import styles from './CharacterCard.module.scss'

const cx = classNames.bind(styles)

interface ICharacter {
  name: string
  gender: string
  species: string
  location: string
  status: string
  image: string
}

interface ICharacterCard {
  character: ICharacter
  mode?: 'view' | 'edit'
}

export const CharacterCard: React.FC<ICharacterCard> = ({
  character,
  mode = 'view'
}) => {
  const { name, gender, species, location, status, image } = character

  const [cardMode, setCardMode] = useState(mode)

  const { t } = useTranslation('common')

  const setEditMode = () => {
    setCardMode('edit')
  }

  return (
    <div className={cx('card')}>
      <img
        alt='Character photo'
        className={cx('card__photo')}
        src={image}
      />

      <span className={cx('card__edit')}>
        <button
          onClick={setEditMode}
          className={cx('button')}
        >
          <EditIcon />
        </button>
      </span>

      <div className={cx('card__description')}>
        <span className={cx('card__name')}>{name}</span>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>
            {t('character.gender', { postProcess: 'capitalizeFirst' })}
          </span>
          <span className={cx('card__value')}>
            {t(`gender.${gender}`, { postProcess: 'capitalizeFirst' })}
          </span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>
            {t('character.species', { postProcess: 'capitalizeFirst' })}
          </span>
          <span className={cx('card__value')}>
            {t(`species.${species}`, { postProcess: 'capitalizeFirst' })}
          </span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>
            {t('character.location', { postProcess: 'capitalizeFirst' })}
          </span>
          <span className={cx('card__value')}>
            {t(`location.${location}`, { postProcess: 'capitalizeFirst' })}
          </span>
        </div>

        <div className={cx('card__status')}>
          <span className={cx('card__label')}>
            {t('character.status', { postProcess: 'capitalizeFirst' })}
          </span>
          <span className={cx('card__value')}>
            {t(`status.${status}`, { postProcess: 'capitalizeFirst' })}{' '}
            <StatusCircle status={status} />
          </span>
        </div>
      </div>
    </div>
  )
}
