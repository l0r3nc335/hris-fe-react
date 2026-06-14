import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateBody, UpdateBody, MutableResourceApi } from '@/services/api/client'

export interface ListResourceApi<T> {
  list: () => Promise<T[]>
  listTrashed: () => Promise<T[]>
  getById: (id: string) => Promise<T>
  create: (body: CreateBody) => Promise<T>
  update: (id: string, body: UpdateBody) => Promise<T>
  remove: (id: string) => Promise<{ id: string; deleted: boolean }>
  softDelete: (id: string) => Promise<T>
  restore: (id: string) => Promise<T>
  deactivate?: (id: string) => Promise<T>
}

export function createListQueryOptions<T>(
  queryKey: QueryKey,
  listFn: () => Promise<T[]>,
) {
  return queryOptions({
    queryKey,
    queryFn: listFn,
  })
}

export function useListQuery<T>(queryKey: QueryKey, listFn: () => Promise<T[]>) {
  return useQuery(createListQueryOptions(queryKey, listFn))
}

export function useTrashedListQuery<T>(
  queryKey: QueryKey,
  listTrashedFn: () => Promise<T[]>,
) {
  return useQuery(createListQueryOptions(queryKey, listTrashedFn))
}

export function useCreateMutation<T extends { id: string }>(
  allKey: QueryKey,
  _listKey: QueryKey,
  api: Pick<ListResourceApi<T>, 'create'>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
      toast.success('Created successfully')
    },
  })
}

export function useUpdateMutation<T extends { id: string }>(
  allKey: QueryKey,
  api: Pick<ListResourceApi<T>, 'update'>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateBody }) => api.update(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
      toast.success('Updated successfully')
    },
  })
}

export function useRemoveMutation(
  allKey: QueryKey,
  api: Pick<ListResourceApi<unknown>, 'remove'>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.remove,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
      toast.success('Permanently deleted')
    },
  })
}

export function useSoftDeleteMutation<T extends { id: string; status: string }>(
  allKey: QueryKey,
  listKey: QueryKey,
  softDeleteFn: (id: string) => Promise<T>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: softDeleteFn,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: allKey })
      const previous = queryClient.getQueryData<T[]>(listKey)
      queryClient.setQueryData<T[]>(listKey, (old) =>
        old?.map((e) => (e.id === id ? { ...e, status: 'deleted' } : e)),
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listKey, context.previous)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
    },
    onSuccess: () => {
      toast.success('Moved to trash')
    },
  })
}

export function useRestoreMutation<T extends { id: string }>(
  allKey: QueryKey,
  restoreFn: (id: string) => Promise<T>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: restoreFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
      toast.success('Restored successfully')
    },
  })
}

export function useDeactivateMutation<T extends { id: string; status: string }>(
  allKey: QueryKey,
  listKey: QueryKey,
  deactivateFn: (id: string) => Promise<T>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deactivateFn,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: allKey })
      const previous = queryClient.getQueryData<T[]>(listKey)
      queryClient.setQueryData<T[]>(listKey, (old) =>
        old?.map((e) => (e.id === id ? { ...e, status: 'inactive' } : e)),
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listKey, context.previous)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: allKey })
    },
    onSuccess: () => {
      toast.success('Deactivated successfully')
    },
  })
}

export function createResourceQueryHooks<T extends { id: string; status: string }>(
  keys: {
    all: QueryKey
    list: () => QueryKey
    trashed: () => QueryKey
  },
  api: MutableResourceApi<T>,
) {
  return {
    useList: () => useListQuery(keys.list(), api.list),
    useTrashedList: () => useTrashedListQuery(keys.trashed(), api.listTrashed),
    useCreate: () => useCreateMutation(keys.all, keys.list(), api),
    useUpdate: () => useUpdateMutation(keys.all, api),
    useSoftDelete: () => useSoftDeleteMutation(keys.all, keys.list(), api.softDelete),
    useRestore: () => useRestoreMutation(keys.all, api.restore),
    useRemove: () => useRemoveMutation(keys.all, api),
  }
}
