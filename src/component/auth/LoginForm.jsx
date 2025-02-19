import { AUTH_ENDPOINTS } from '@/constants/endpoints'
import { useCreateData } from '@/hooks/useApiService'
import React from 'react'

export default function LoginForm() {
  const login = useCreateData(AUTH_ENDPOINTS.LOGIN, 'login')

  function submit() {
    login.mutate(data, {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }
  return (
    <div>
      {' '}
      <button>{login.isPending ? 'loading' : 'Login'}</button>
    </div>
  )
}
