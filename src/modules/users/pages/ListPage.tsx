import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { RecordSearchPanel } from '@/components/RecordSearchPanel'
import { EMAIL_FIELD } from '@/constants/formFields'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { useRecordSearchList } from '@/hooks/useRecordSearchList'
import { queryKeys } from '@/lib/queryKeys'
import { searchUsers, usersApi } from '@/services/api/usersApi'
import {
  useCreateUser,
  useUpdateUser,
  useSoftDeleteUser,
  useRestoreUser,
  useRemoveUser,
} from '../hooks'
import { USER_SEARCH_FIELDS } from '../searchFields'

export function UsersListPage(): React.JSX.Element {
  const recordSearch = useRecordSearchList({
    fields: USER_SEARCH_FIELDS,
    listFn: usersApi.list,
    trashedListFn: usersApi.listTrashed,
    searchFn: searchUsers,
    queryKeyPrefix: queryKeys.users.all,
  })

  const crud = useEntityCrudPage({
    title: 'Users',
    description: 'Manage user accounts',
    emptyTitle: 'No users found',
    entitySingular: 'user',
    nameFields: 'split',
    formFields: [EMAIL_FIELD],
    createPermission: PERMISSIONS.usersWrite,
    writePermission: PERMISSIONS.usersWrite,
    clientSideFilter: false,
    listSource: recordSearch.listSource,
    hooks: {
      useList: () => ({ data: undefined, meta: undefined, isLoading: false }),
      useTrashedList: () => ({ data: undefined, meta: undefined, isLoading: false }),
      useCreate: useCreateUser,
      useUpdate: useUpdateUser,
      useSoftDelete: useSoftDeleteUser,
      useRestore: useRestoreUser,
      useRemove: useRemoveUser,
    },
  })

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        headerContent={<RecordSearchPanel {...recordSearch.searchPanelProps} />}
        hideToolbarSearch
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}
