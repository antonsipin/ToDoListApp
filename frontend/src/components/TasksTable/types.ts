import {
    ReactElement, ReactNode
} from 'react'
import {
    Row, Table
} from '@tanstack/table-core/src/types'

export type TasksTableProps<T> = {
    table: Table<T>
    totalItems?: number
    totalPages?: number
    page?: number
    pageSize?: number
    loading?: boolean
    renderLoader?: ReactNode
    headerWrapperClass?: string
    rowWrapperClass?: string
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    renderSubRow?: (row: Row<T>) => ReactElement
    onRowClick?: (row: Row<T>) => void
    onRowDoubleClick?: (row: Row<T>) => void
}