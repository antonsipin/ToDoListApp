import { ResponseTask, ResponseUser } from '../types/Response'
import { User } from '../types/User'
import { SignInUser } from '../types/SignInUser'

export async function getTasks(accessToken: string): Promise<any> {
  try {
    const response = await fetch('/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    const tasks = await response.json()
    return tasks
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
      data: []
    }
  }
}

export async function resolveTask(id: string, accessToken: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/tasks/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    body: JSON.stringify({ id })
  })
  return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function addTask(taskName: string, taskDescription: string, accessToken: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ taskName, taskDescription })
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function signUp(user: User): Promise<ResponseUser> {
    const response = await fetch('/users/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
  } 

export async function signIn(user: SignInUser): Promise<ResponseUser> {
    const response = await fetch('/users/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}

export async function logout(accessToken: string): Promise<ResponseUser> {
    const response = await fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const result = await response.json()
    if (response.status >= 400) {
      throw new Error(result.error)
    }
    return result
}

export async function deleteTask(id: string, accessToken: string): Promise<ResponseTask> {
  try {
    const response = await fetch(`/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}

export async function updateTask(id: string, taskName: string, taskDescription: string, accessToken: string): Promise<ResponseTask> {
  try {
    const response = await fetch('/tasks/name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ id, taskName, taskDescription })
    })
    return await response.json()
  } catch (e) {
    return {
      result: 'Error',
      error: String(e),
    }
  }
}
