import { type ComponentType, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'

import {
  ArrowDownIcon,
  ArrowDownIconSmall,
  ArrowUpIcon,
  ArrowUpIconSmall,
  CrossIcon
} from '@/assets/icons'

import styles from './Select.module.scss'

const cx = classNames.bind(styles)

const ICONS = {
  small: { up: <ArrowUpIconSmall />, down: <ArrowDownIconSmall /> },
  medium: { up: <ArrowUpIcon />, down: <ArrowDownIcon /> }
}

export type Option<T> = {
  label: string
  value?: T
}

type DefaultOptionComponentProps<T> = {
  option: Option<T>
}

type SelectProps<T> = {
  options: Option<T>[]
  placeholder?: string
  value?: T
  size?: 'small' | 'medium'
  OptionComponent?: ComponentType<DefaultOptionComponentProps<T>>
  onChange: (value: T) => void
}

const DefaultOptionComponent = <T,>({
  option
}: DefaultOptionComponentProps<T>) => {
  return <span>{option.label}</span>
}

export const Select = <T,>({
  options,
  placeholder,
  onChange,
  size = 'medium',
  OptionComponent = DefaultOptionComponent,
  value
}: SelectProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value)

  const [isOpen, setIsOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleOptionClick = (newValue: T) => {
    onChange(newValue)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange(null)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const icons = ICONS[size]

  return (
    <div
      ref={componentRef}
      className={cx('select', { select_small: size === 'small' })}
    >
      <button
        onClick={handleOpen}
        className={cx('select__button', {
          select__button_small: size === 'small'
        })}
      >
        {selectedOption?.label ? (
          <OptionComponent option={selectedOption} />
        ) : (
          placeholder
        )}

        {selectedOption && size !== 'small' && (
          <CrossIcon onClick={handleClear} />
        )}

        {(!selectedOption || size === 'small') &&
          (isOpen ? icons.up : icons.down)}
      </button>

      {isOpen && (
        <ul
          className={cx('select__list', {
            select__list_small: size === 'small'
          })}
        >
          {options?.map((option) => (
            <li
              className={cx('select__item', {
                select__item_small: size === 'small'
              })}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              <OptionComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
