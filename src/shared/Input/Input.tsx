import React, { useRef, useState } from 'react'
import { CrossIcon } from '@/assets/icons'
import classNames from 'classnames/bind'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface IInter {
  variant?: 'bordered' | 'underlined'
  value?: string
  icon?: React.ReactNode
  placeholder?: string
  onChange?: (value: string) => void
  className?: string | string[]
}

export const Input: React.FC<IInter> = ({
  variant = 'bordered',
  value,
  onChange,
  icon,
  className,
  placeholder
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const [hasValue, setHasValue] = useState(false)

  const handleInput = () => {
    const value = ref.current?.value ?? ''
    setHasValue(value.length > 0)
    onChange?.(value)
  }

  const handleClear = () => {
    if (!ref.current) return
    ref.current.value = ''
    setHasValue(false)
    onChange?.('')
    ref.current.focus()
  }

  return (
    <div
      onClick={() => ref.current?.focus()}
      className={cx('input--box', `input--box-${variant}`, className)}
    >
      <div className={cx('input--inner')}>
        {variant === 'bordered' && icon}

        <input
          ref={ref}
          defaultValue={value}
          onInput={handleInput}
          className={cx('input', `input-${variant}`)}
          placeholder={placeholder}
        />
      </div>

      {hasValue && variant === 'bordered' && (
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
