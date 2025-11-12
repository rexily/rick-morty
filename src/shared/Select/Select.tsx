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

export interface IOptions {
  label: string
  value: string
}

export interface SelectOptionContentProps {
  value?: string
}

export const DefaultSelectOptionContent = ({
  value
}: SelectOptionContentProps) => {
  return <>{value}</>
}

interface ISelectProps {
  options: IOptions[]
  size: 'default' | 'small'
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  SelectOptionComponent?: React.FC<SelectOptionContentProps>
}

export const Select = ({
  options,
  size = 'default',
  value,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<IOptions | null>(null)
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

  const handleShowFilterOptions = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleOptionClickSave = (option: IOptions) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange?.(option.value)
  }

  const icons = {
    small: {
      up: <ArrowUpIconSmall />,
      down: <ArrowDownIconSmall />
    },
    default: {
      up: <ArrowUpIcon />,
      down: <ArrowDownIcon />
    }
  }

  const icon =
    icons[size === 'small' ? 'small' : 'default'][!isOpen ? 'up' : 'down']

  return (
    <div
      className={cx('select', {
        select_small: size === 'small'
      })}
      ref={componentRef}
    >
      <button
        type='button'
        className={cx('select__button', {
          select__button_small: size === 'small'
        })}
        onClick={handleShowFilterOptions}
      >
        {size === 'small' ? (
          <div className={cx('select__button-inner')}>
          <SelectOptionComponent
            value={
              selectedOption?.label || value || placeholder
            }
          /></div>
        ) : (
          selectedOption?.label || value || placeholder
        )}

        {icon}
      </button>

      {isOpen && options.length && (
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
                handleOptionClickSave(option)
              }}
            >
              <SelectOptionComponent value={option.label} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
