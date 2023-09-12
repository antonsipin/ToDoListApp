import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table"
import Task from '../../features/tasks/types/Task'

export const columns: MRT_ColumnDef<Task>[] = [
    {
      header: 'Task Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'message',
    },
  ]

  export function MaterialTable({ tasks }: any) {
    const tasksData: Task[] = useMemo(() => tasks || [], [tasks])
    const navigate = useNavigate()

    const handleClick = (id: string) => {
        const taskId = tasksData[Number(id)].id
        navigate(`/tasks/${taskId}`)
    }

    return (
            <MaterialReactTable
            columns={columns}
            data={tasksData}
            enableRowSelection={(row) => row.original.status === false}
            enableRowNumbers
            rowNumberMode='static'
            enableFullScreenToggle={false}
            initialState={{ density: 'comfortable' }}
            muiTableBodyRowProps={({ row }) => ({
                onClick: () => handleClick(row.id),
                sx: {
                cursor: 'pointer'
                },
            })}
            />
    );
  }