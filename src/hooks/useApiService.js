import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import {
  deleteData,
  fetchData,
  patchData,
  postData,
  updateData,
} from '@/config/service'
import { handleGenericError } from '@/lib/errorHandler'

export const useFetchData = (endpoint, queryKey) => {
  return useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: () => fetchData(endpoint),
    refetchOnWindowFocus: false,
  })
}

export const useCreateData = (endpoint, queryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      const response = await postData(endpoint, data)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey)
      return response
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    },
  })
}

export const useUpdateData = (endpoint, queryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newData) => {
      const response = await updateData(endpoint, newData)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey)
      return response
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error)
      // toast.error(errorMessage);
      throw new Error(errorMessage)
    },
  })
}

export const usePatchData = (endpoint, queryKey) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      const response = await patchData(endpoint, data)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey)
      return response
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    },
  })
}

export const useDeleteData = (endpoint, queryKey) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await deleteData(endpoint, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    },
  })
}
