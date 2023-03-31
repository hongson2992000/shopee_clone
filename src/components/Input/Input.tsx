import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import React, { InputHTMLAttributes } from 'react'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
