import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useAppDispatch } from '@/hooks'
import { fetchMe, refreshSession } from '@/slices/authSlice'
import { setAuthHandlers, getAccessToken } from '@/services/httpClient'
import { store } from '@/store'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Providers } from './providers'

function AuthBootstrap(): React.JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    setAuthHandlers({
      refresh: async () => {
        const result = await dispatch(refreshSession())
        if (refreshSession.fulfilled.match(result)) return result.payload
        return null
      },
      unauthorized: () => {
        void dispatch(refreshSession())
      },
    })
    if (getAccessToken()) void dispatch(fetchMe())
  }, [dispatch])

  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  )
}

export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AuthBootstrap />
    </Provider>
  )
}
