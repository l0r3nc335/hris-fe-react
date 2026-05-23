import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { SettingsEntity } from '@/modules/settings/types'

export async function listSettings(): Promise<SettingsEntity[]> {
  const res = await httpClient.get<ApiResponse<SettingsEntity[]>>(endpoints.settings.list)
  return res.data.data
}

export async function getSettings(id: string): Promise<SettingsEntity> {
  const res = await httpClient.get<ApiResponse<SettingsEntity>>(endpoints.settings.byId(id))
  return res.data.data
}
