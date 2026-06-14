import { queryKeys } from '@/lib/queryKeys'
import { settingsApi } from '@/services/api/settingsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.settings, settingsApi)

export const useSettingsList = hooks.useList
export const useSettingsTrashedList = hooks.useTrashedList
export const useCreateSettings = hooks.useCreate
export const useUpdateSettings = hooks.useUpdate
export const useSoftDeleteSettings = hooks.useSoftDelete
export const useRestoreSettings = hooks.useRestore
export const useRemoveSettings = hooks.useRemove