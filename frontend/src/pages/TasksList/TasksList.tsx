import { useEffect, useState, useMemo, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Task from '../../types/Task'
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
import { AlertComponent } from '../../components/Alert'
import { MdOutlineList, MdOutlineViewList } from 'react-icons/md'
import { Select } from '../../components/Select/Select'
import { ThemeContext } from '../../App/ThemeContext'
import { TableModeContext } from '../../App/TableModeContext'
const URL = 'ws://localhost:3100'

export default function TasksList(): JSX.Element {
  const { info, error, tasks, handleCreateTask, handleLoadTasks, handleInfo, handleError, handleUpdate, handleDelete, handleHide, handleResolve } = useTasks()
  const location = useLocation()
  const DEFAULT_PAGE_SIZE = 8
  const { theme, setTheme } = useContext(ThemeContext)
  const { tableMode, setTableMode } = useContext(TableModeContext)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + DEFAULT_PAGE_SIZE
  const currentItems = useMemo(() => tasks.slice(itemOffset, endOffset), [tasks, itemOffset, endOffset])
  const pageCount = Math.ceil(tasks.length / DEFAULT_PAGE_SIZE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(URL)
    ws.onopen = () => {
    }
    ws.onmessage = (event) => {
    }

    handleLoadTasks()

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
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
    <div className={cn(
      styles.Wrapper,
      styles[`Wrapper--${theme}`]
      )}>
      <div className={styles.header}>
        <Link to='/logout' className={styles.LogoutLink}>Logout</Link>
        <div className={theme}>
          <Select value={theme} setTheme={setTheme} />
        </div>

          <Button 
            onClick={() => setTableMode(!tableMode)} 
            children={
              tableMode ?
                <div>
                  Switch mode{' '}
                  <MdOutlineList />
                </div> :
                <div>
                  Switch mode{' '}
                  <MdOutlineViewList />
                </div>
          } 
          btnType={'mode'}
        />
        
      <span className={styles.userName}>
        {`Good job, ${location.state?.name}!`}
      </span>
      </div>

      {info || error ? 
      <AlertComponent 
      error={error} 
      info={info} 
      onHandleInfo={handleInfo} 
      onHandleError={handleError}/>: 
      ''}

      <Form onHandleSubmit={handleSubmit} />

      {tableMode ? (
        !isLoaded ?
        <div className={styles.loader}>
        <Spinner />
        </div>:
        <div>
          {currentItems.length ? <div
          className={cn(
            styles.tableWrapper, 
            styles[`tableWrapper--${theme}`]
            )}
          >
            <MaterialTable tasks={tasks} />
          </div>:
           <NoTasks />
           }
        </div>
          
      ) : (
        <div className={styles.taskWrapper}>
        {   !isLoaded ? 
            <div className={styles.loader}>
            <Spinner />
            </div> : (
              currentItems.length ?  
              currentItems.map(
              (task: Task) => <TaskComponent key={task.id} task={task} onHandleUpdate={handleUpdate} onHandleDelete={handleDelete} onHandleHide={handleHide} onHandleResolve={handleResolve} className={theme}/>
              ): 
                <NoTasks />
            )
        }
              {isLoaded && 
              <div className={styles.Paginate}>
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
              
              }
      </div>
      )
      }
    </div>
  )
}
