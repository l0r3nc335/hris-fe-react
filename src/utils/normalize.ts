import type { BaseEntity } from '@/types'

export interface NormalizedState<T extends BaseEntity> {
  ids: string[]
  entities: Record<string, T>
}

export function normalizeEntities<T extends BaseEntity>(items: T[]): NormalizedState<T> {
  const ids: string[] = []
  const entities: Record<string, T> = {}
  for (const item of items) {
    ids.push(item.id)
    entities[item.id] = item
  }
  return { ids, entities }
}
