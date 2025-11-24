import React, { useRef, useState } from 'react'
import { CrossIcon } from '@/assets/icons'
import classNames from 'classnames/bind'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface IInput {
  variant?: 'bordered' | 'underlined'
  value: string
  icon?: React.ReactNode
  placeholder?: string
  onChange: (value: string) => void
  className?: string | string[]
}

export const Input: React.FC<IInput> = ({
  variant = 'bordered',
  value,
  onChange,
  icon,
  className,
  placeholder
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState<string>(value)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }


  const handleClear = () => {
    setInputValue('')
    onChange('')
  }

  const setFocus = () => {
    ref.current?.focus()
  }

  return (
    <div
      onClick={setFocus}
      className={cx('input--box', `input--box-${variant}`, className)}
    >
      <div className={cx('input--inner')}>
        {icon}

        <input
          ref={ref}
          value={inputValue}
          onChange={handleInput}
          className={cx('input', `input-${variant}`)}
          placeholder={placeholder}
        />
      </div>

      {inputValue.length > 0 && (
        <button
          className={cx('button')}
          onClick={handleClear}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  )
}
