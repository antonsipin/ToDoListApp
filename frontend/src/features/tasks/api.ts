import Task from './types/Task'

export async function getTasks(): Promise<Task[]> {
  const response = await fetch('/task', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const tasks = response.json()
  return tasks
}

export async function resolveTask(id: string, status: boolean): Promise<Task> {
  const response = await fetch('/task/resolve', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ id, status })
  })
  return response.json()
}

export async function addTask(taskName: string): Promise<Task> {
  const response = await fetch('/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskName })
  })
  return response.json()
}

export async function deleteTask(id: string): Promise<Task> {
  const response = await fetch(`/task/delete/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}
