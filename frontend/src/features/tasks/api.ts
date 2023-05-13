import Response from './types/Response'
import ResponseTasks from './types/ResponseTasks'

export async function getTasks(): Promise<ResponseTasks> {
  const response = await fetch('/task', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const tasks = await response.json()
  return tasks
}

export async function resolveTask(id: string): Promise<Response> {
  const response = await fetch('/task/resolve', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ id })
  })
  return await response.json()
}

export async function addTask(taskName: string): Promise<Response> {
  const response = await fetch('/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskName })
  })
  return await response.json()
}

export async function deleteTask(id: string): Promise<Response> {
  const response = await fetch(`/task/delete/${id}`, {
    method: 'DELETE'
  })
  return await response.json()
}

export async function updateTask(id: string, taskName: string): Promise<Response> {
  const response = await fetch('/task/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, taskName })
  })
  return await response.json()
}
