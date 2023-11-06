import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { ILoginForm, IRegisterForm, IAuthResponse } from '@/interfaces/auth'

const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const baseUrl = import.meta.env.VITE_MANGOCATAPI_URL
  const error = ref()
  const isLoading = ref(false)
  const { username, jwt } = storeToRefs(authStore)

  const initializeState = () => {
    error.value = undefined
    isLoading.value = false
  }

  const setUserData = (data: IAuthResponse) => {
    authStore.setUser(data.username)
    authStore.setJwt(data.token)
  }

  const login = async (loginForm: ILoginForm) => {
    initializeState()
    try {
      const { data } = await axios.post<IAuthResponse>(
        `${baseUrl}/auth/login`,
        loginForm
      )
      setUserData(data)
      router.push({ name: 'home' })
    } catch (err: AxiosError | any) {
      console.log(err)
      error.value = err.response.data.message
    } finally {
      isLoading.value = false
    }
  }

  const register = async (registerForm: IRegisterForm) => {
    initializeState()
    try {
      const { data } = await axios.post<IAuthResponse>(
        `${baseUrl}/auth/register`,
        registerForm
      )
      setUserData(data)
      router.push({ name: 'home' })
    } catch (err: AxiosError | any) {
      console.log(err)
      error.value = err.response.data.message
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    authStore.logout()
    router.push('/')
  }

  return {
    username,
    jwt,
    error,
    isLoading,

    login,
    register,
    logout,
  }
}

export default useAuth