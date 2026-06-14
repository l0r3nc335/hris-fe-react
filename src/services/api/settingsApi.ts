import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { SettingsEntity } from '@/modules/settings/types'

const api = createMutableResourceApi<SettingsEntity>({
  list: endpoints.settings.list,
  byId: endpoints.settings.byId,
  trashed: endpoints.settings.trashed,
  softDelete: endpoints.settings.softDelete,
  restore: endpoints.settings.restore,
})

export const listSettings = api.list
export const getSettings = api.getById
export const settingsApi = api
