/* eslint-disable import/no-unresolved */
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, LoginSchema, loginSchema } from 'src/utils/rule'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
type FormData = LoginSchema
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const value = watch()
  console.log(errors, value)
  const loginAccount = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccount.mutate(data, {
      onSuccess(data) {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                type='email'
                className='mt-8'
                name='email'
                placeholder='Email'
                autoComplete='on'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                type='password'
                className='mt-2'
                name='password'
                placeholder='Password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-8'>
                <button
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-8'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                  <Link className='ml-1 text-red-300' to='/register'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
