import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowDownIconSmall,
  ArrowUpIconSmall
} from '@/assets/icons'

import styles from './Select.module.scss'

const cx = classNames.bind(styles)

export interface IOptions<T extends string = string> {
  label: string
  value: T
}

export interface SelectOptionContentProps<T extends string = string> {
  label: string
  value?: T
}

export const DefaultSelectOptionContent = <T extends string>({
  label
}: SelectOptionContentProps<T>) => <>{label}</>

interface ISelectProps<T extends string> {
  options: readonly IOptions<T>[]
  size?: 'default' | 'small'
  value?: T
  placeholder?: string
  onChange?: (value: T) => void
  SelectOptionComponent?: React.FC<SelectOptionContentProps<T>>
}

const ICONS = {
  small: { up: <ArrowUpIconSmall />, down: <ArrowDownIconSmall /> },
  default: { up: <ArrowUpIcon />, down: <ArrowDownIcon /> }
}

export const Select = <T extends string>({
  options,
  size = 'default',
  value,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<IOptions<T> | null>(null)

  const componentRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
    if (!value) {
      setSelectedOption(null)
      return
    }
    const currentValue = options.find((o) => o.value === value) || null
    setSelectedOption(currentValue)
  }, [value, options])

  const renderSelected = () => {
    if (size === 'small') {
      return (
        <SelectOptionComponent
          label={selectedOption?.label ?? placeholder ?? ''}
          value={selectedOption?.value}
        />
      )
    }

    if (selectedOption) return selectedOption.label
    if (placeholder) return placeholder
    return ''
  }

  const renderOption = (option: IOptions<T>) => {
    return (
      <SelectOptionComponent
        label={option.label}
        value={option.value}
      />
    )
  }

  const icons = ICONS[size]

  return (
    <div
      ref={componentRef}
      className={cx('select', { select_small: size === 'small' })}
    >
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className={cx('select__button', {
          select__button_small: size === 'small'
        })}
      >
        <div className={cx('select__button-inner')}>{renderSelected()}</div>

        {isOpen ? icons.up : icons.down}
      </button>

      {isOpen && (
        <ul
          className={cx('select__list', {
            select__list_small: size === 'small'
          })}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={cx('select__item', {
                select__item_small: size === 'small'
              })}
              onClick={() => {
                setSelectedOption(option)
                setIsOpen(false)
                onChange?.(option.value)
              }}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
