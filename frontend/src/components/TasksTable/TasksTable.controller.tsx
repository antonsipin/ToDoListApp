import React, { useMemo } from 'react'
import Task from '../../features/tasks/types/Task'
import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import useTasks from '../../features/tasks/useTasks'
import styles from './TasksTable.module.scss'

const columnsHelper = createColumnHelper<Task>()

export const useTasksTableController = () => {
    const { tasks } = useTasks()

const columns = useMemo(() => [
    columnsHelper.accessor('name', {
        id: 'name',
        header: ({ column }) => (
            <div className={styles.wrapper}
                // sort={column?.getIsSorted()}
                // onClickSort={column?.getToggleSortingHandler()}
            >
                Task name
            </div>
        ),
        cell: ({ row }) => (
            <div>
                {row.original.name}
            </div>
        )
    })
], [])

const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    sortDescFirst: false,
    enableMultiSort: false,
})

return {
    table
    }
}
