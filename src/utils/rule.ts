import { type } from 'os'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email bắt buộc'
    },
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-161 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-161 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Password chưa khớp'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-161 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-161 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Không khớp với password'
        : undefined
  }
})
export const schema = yup.object({
  email: yup
    .string()
    .required('Email bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(161, 'Độ dài từ 6-161 ký tự'),
  confirm_password: yup
    .string()
    .required('Confirm password bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(161, 'Độ dài từ 6-161 ký tự')
    .oneOf([yup.ref('password')], 'Password không khớp')
})
// const loginSchema = schema.omit(['confirm_password'])
// type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
