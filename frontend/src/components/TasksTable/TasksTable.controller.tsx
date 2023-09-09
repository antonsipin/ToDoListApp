import React, { useMemo } from 'react'
import Task from '../../features/tasks/types/Task'
import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import styles from './TasksTable.module.scss'
import { TableProps } from './types'
import { TableColumn } from '../../components/TableColumn'
import {
    useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools'
import { getTasks } from '../../features/tasks/api'
import { useTableSort } from '../../hooks/useTableSort'

const columnsHelper = createColumnHelper<Task>()

export const useTasksTableController = (props: TableProps) => {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks
    })
    
    const tasks = useMemo(() => data?.data || [], [data])

    const columns = useMemo(() => [
        columnsHelper.accessor('name', {
            id: 'name',
            header: ({ column }) => (
                <TableColumn className={styles.wrapper}
                    sort={column?.getIsSorted()}
                    onClickSort={column?.getToggleSortingHandler()}
                >
                    Task name
                </TableColumn>
            ),
            cell: ({ row }) => (
                <div>
                    {row.original.name}
                </div>
            )
        })
    ], [])

    // const { setSorting, sorting } = useTableSort({
    //     columnSortMap,
    //     setQuery: setUsersQuery,
    //     initialValues: usersQuery
    //   })
    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        sortDescFirst: false,
        enableMultiSort: false,
        // onSortingChange: setSorting,
        // state: {
        //     sorting,
        // },
    })

    return {
        table,
        isLoading,
        error,
        isFetching,
        totalCount: data?._meta?.totalCount || 0,
        totalPages: data?._meta?.totalPages || 1,
    }
}
