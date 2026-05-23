import { createSelector } from '@reduxjs/toolkit'
import { selectdocumentsState } from './documentsSlice'
import type { DocumentsEntity } from '@/modules/documents/types'

export const selectdocumentsList = createSelector([selectdocumentsState], (state): DocumentsEntity[] =>
  state.ids.map((id) => state.entities[id]).filter((e): e is DocumentsEntity => Boolean(e)),
)

export const selectdocumentsStatus = createSelector([selectdocumentsState], (s) => s.status)
