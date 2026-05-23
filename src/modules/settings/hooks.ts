import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchSettingsList } from '@/slices/settingsSlice'
import { selectsettingsList, selectsettingsStatus } from '@/slices/settingsSelectors'

export function useSettingsList(): {
  items: ReturnType<typeof selectsettingsList>
  status: ReturnType<typeof selectsettingsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectsettingsList)
  const status = useAppSelector(selectsettingsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchSettingsList())
    }
  }, [dispatch, status])

  return { items, status }
}
