import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ILogoutRequest } from '@/types'
import { logoutApi } from '@/api/auth'
import { useUserStore } from '@/stores'
import { showToast } from '@/utils'

export const useLogout = () => {
  const { setLogout } = useUserStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ILogoutRequest) => {
      return await logoutApi(data)
    },
    onSuccess: () => {
      setLogout()
      showToast('Đăng xuất thành công')
      navigate('/auth/login')
    },
    onError: (error) => {
      console.log('Check error: ', error)
    }
  })
}