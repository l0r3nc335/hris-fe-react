import { createSelector } from '@reduxjs/toolkit'
import { selectauditState } from './auditSlice'
import type { AuditEntity } from '@/modules/audit/types'

export const selectauditList = createSelector([selectauditState], (state): AuditEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is AuditEntity => Boolean(e)),
)

export const selectauditStatus = createSelector([selectauditState], (s) => s.status)
