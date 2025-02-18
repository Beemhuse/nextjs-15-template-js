'use client'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import React from 'react'

export default function Page() {
  const { data } = useFetchData(POST_ENDPOINTS.GET_POSTS, 'get posts')
  console.log(data)
  return <div></div>
}
