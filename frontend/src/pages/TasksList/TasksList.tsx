import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Task from '../../types/Task'
import Info from '../../components/Info/Info'
import Form from '../../components/Form/Form'
import NoTasks from '../../components/NoTasks/NoTasks'
import styles from './TasksList.module.scss'
import '../../components/Logout' 
import useTasks from '../../hooks/useTasks'        
import TaskComponent from '../../components/TaskComponent/TaskComponent'
import { MaterialTable } from '../../components/TasksTable'
import { Spinner } from '../../components/Loader'
import cn from 'classnames'
import Button from '../../components/Button'
import ReactPaginate from 'react-paginate'
const URL = 'ws://localhost:3100'

export default function TasksList(): JSX.Element {
  const { info, error, tasks,  handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const DEFAULT_PAGE_SIZE = 7
  const [theme, setTheme] = useState('White')
  const [tableMode, setTableMode] = useState(false)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + DEFAULT_PAGE_SIZE
  const currentItems = useMemo(() => tasks.slice(itemOffset, endOffset), [tasks, itemOffset, endOffset])
  const pageCount = Math.ceil(tasks.length / DEFAULT_PAGE_SIZE)

  useEffect(() => {
    const ws = new WebSocket(URL)
    ws.onopen = () => {
    }
    ws.onmessage = (event) => {
    }
    handleLoadTasks()
  }, [])

  function handleSubmit(event: React.FormEvent, task: string, taskDescription: string): void {
    event.preventDefault() 
    handleCreateTask(task, taskDescription)
  }

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * DEFAULT_PAGE_SIZE) % tasks.length;
    setItemOffset(newOffset);
  }

  return (
    <div className={styles[theme]}>
      <div className={styles.header}>
        <Link to='/logout' className='LogoutLink'>Logout</Link>

        <select className={theme} value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
            <option value='White'>White</option>
            <option value='Black'>Black</option>
        </select>
        <Button 
        onClick={() => setTableMode(!tableMode)} 
        children={'Switch mode'} 
        btnType={'mode'}
      />
      </div>
      <Info onHandleInfo={handleInfo} info={info}  />
      <Form onHandleSubmit={handleSubmit} onHandleError={handleError} error={error}/>
      
      {tableMode ? (
        tasks.length  ?
          <div
          className={cn(styles.tableWrapper)}
          >
            <MaterialTable tasks={tasks} />
          </div> :
          <div className={styles.loader}>
          <Spinner />
          </div> || <NoTasks />
      ) : (
        <div className={styles.taskWrapper}>
        {   
            currentItems.length ?  
            
              currentItems.map(
              
              (task: Task) => <TaskComponent key={task.id} task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} className={theme}/>
              ):
              <div className={styles.loader}>
                <Spinner />
              </div> || <NoTasks />
        }
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
      </div>
      )
      }
    </div>
  )
}
