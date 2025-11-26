import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './CharacterCard.module.scss'
import { EditIcon } from '@/assets/icons'
import { StatusCircle } from '@/shared'

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

  const handleMode = () => {
    setCardMode('edit')
  }

  return (
    <div className={cx('card')}>
      <img
        alt='Caracter photo'
        className={cx('card__photo')}
        src={image}
      />

      <span className={cx('card__edit')}>
        <button
          onClick={handleMode}
          className={cx('button')}
        >
          <EditIcon />
        </button>
      </span>

      <div className={cx('card__description')}>
        <span className={cx('card__name')}>{name}</span>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>Gender</span>
          <span className={cx('card__value')}>{gender}</span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>Species</span>
          <span className={cx('card__value')}>{species}</span>
        </div>

        <div className={cx('card__row')}>
          <span className={cx('card__label')}>Location</span>
          <span className={cx('card__value')}>{location}</span>
        </div>

        <div className={cx('card__status')}>
          <span className={cx('card__label')}>Status</span>
          <span className={cx('card__value')}>
            {status} <StatusCircle status={status.toLowerCase()} />
          </span>
        </div>
      </div>
    </div>
  )
}
