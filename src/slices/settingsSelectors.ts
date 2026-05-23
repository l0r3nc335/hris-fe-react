import { createSelector } from '@reduxjs/toolkit'
import { selectsettingsState } from './settingsSlice'
import type { SettingsEntity } from '@/modules/settings/types'

export const selectsettingsList = createSelector([selectsettingsState], (state): SettingsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is SettingsEntity => Boolean(e)),
)

export const selectsettingsStatus = createSelector([selectsettingsState], (s) => s.status)
