import React from 'react'
import cn from 'classnames'
import { Row, flexRender } from '@tanstack/react-table'
import styles from './TasksTable.module.scss'
import { TasksTableProps } from './types'
import { useTasksTableController } from './TasksTable.controller'

const TasksTable = function <T> (props: TasksTableProps<T>): JSX.Element {
    const {
        table,
        // totalItems,
        // totalPages,
        // page,
        // pageSize,
        // loading,
        // renderLoader,
        // headerWrapperClass,
        // rowWrapperClass,
        // onPageChange,
        // onPageSizeChange,
        // renderSubRow,
        // onRowClick,
        // onRowDoubleClick
    } = useTasksTableController()

    // const hasPagination = totalItems > 15
    console.log(table)

    return (
        <div>
            {
                table
                .getHeaderGroups()
                .map((el) => el.headers.map(
                    (elem) => flexRender(elem.column.columnDef.header, elem.getContext())
                ))
            }
            {table.getRowModel().rows.map((row) => (
            <div key={row.id}>
              <div
                // onClick={() => onRowClick ? onRowClick(row) : null}
                // onDoubleClick={() => onRowDoubleClick ? onRowDoubleClick(row) : null}
                // onKeyUp={(e) => handleKeyUp(e, row)}
                role="row"
                tabIndex={0}
              >
                {row
                  .getVisibleCells()
                  .map((cell) => flexRender(cell.column.columnDef.cell, cell.getContext()))}
              </div>
              {/* {row.getIsExpanded() && !!renderSubRow && (
              <div className={styles.rowExpandWrapper}>{renderSubRow(row)}</div>
              )} */}
            </div>
          ))}
        </div>
    )
}

export { TasksTable }